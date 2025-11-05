import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { ProcessReceiptDto } from './dto/process-receipt.dto';
import {
  ReceiptProductDto,
  ProcessReceiptResponseDto,
} from './dto/receipt-product.dto';
import { ProductsService } from '../products/products.service';
import { ShopsService } from '../shops/shops.service';
import { TransactionsService } from '../transactions/transactions.service';
import { PointsService } from '../points/points.service';
import { Product } from '../products/product.entity';

@Injectable()
export class ReceiptsService {
  private readonly logger = new Logger(ReceiptsService.name);

  constructor(
    private readonly productsService: ProductsService,
    private readonly shopsService: ShopsService,
    private readonly transactionsService: TransactionsService,
    private readonly pointsService: PointsService,
  ) {}

  async processReceipt(
    processReceiptDto: ProcessReceiptDto,
  ): Promise<ProcessReceiptResponseDto> {
    const { receiptUrl } = processReceiptDto;

    try {
      // Validate that the URL is from suf.purs.gov.rs
      if (!receiptUrl.includes('suf.purs.gov.rs')) {
        throw new HttpException(
          'Invalid receipt URL. Must be from suf.purs.gov.rs',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Extract the 'vl' parameter from the URL
      const url = new URL(receiptUrl);
      const vl = url.searchParams.get('vl');

      if (!vl) {
        throw new HttpException(
          'Invalid receipt URL. Missing vl parameter',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Try fetching from the API endpoint first
      try {
        const apiUrl = `https://suf.purs.gov.rs/api/v/?vl=${encodeURIComponent(vl)}`;
        this.logger.log(`Fetching receipt data from API: ${apiUrl}`);

        const apiResponse = await axios.get(apiUrl, {
          headers: {
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            Accept: 'application/json',
          },
          timeout: 10000,
        });

        if (apiResponse.data) {
          return this.parseReceiptData(apiResponse.data);
        }
      } catch (apiError) {
        this.logger.warn('API endpoint failed, trying HTML scraping fallback');
      }

      // Fallback to HTML scraping
      this.logger.log(`Fetching receipt HTML from: ${receiptUrl}`);
      const htmlResponse = await axios.get(receiptUrl, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          Accept: 'text/html',
        },
        timeout: 10000,
      });

      return this.parseReceiptFromHtml(htmlResponse.data);
    } catch (error) {
      this.logger.error('Error processing receipt:', error);

      if (error instanceof HttpException) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new HttpException(
            'Receipt not found or invalid URL',
            HttpStatus.NOT_FOUND,
          );
        }

        throw new HttpException(
          `Failed to fetch receipt data: ${error.message}`,
          HttpStatus.BAD_GATEWAY,
        );
      }

      throw new HttpException(
        'An error occurred while processing the receipt',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async parseReceiptData(data: any): Promise<ProcessReceiptResponseDto> {
    try {
      const products: ReceiptProductDto[] = [];

      // The structure will depend on the actual API response
      // Common patterns in Serbian fiscal receipts:
      // - items, stavke, products, or similar field for line items
      // - quantity fields: kolicina, qty, quantity
      // - product name: naziv, name, description

      let items: any[] = [];
      let receiptDate: string | undefined;
      let storeName: string | undefined;
      let rawStoreName: string | undefined;
      let shopLocation: string | undefined;
      let receiptId: string | undefined;

      // Try different possible structures
      if (data.items) {
        items = data.items;
      } else if (data.stavke) {
        items = data.stavke;
      } else if (data.receiptItems) {
        items = data.receiptItems;
      } else if (Array.isArray(data)) {
        items = data;
      }

      // Extract receipt date
      if (data.receiptDate || data.datum || data.date) {
        receiptDate = data.receiptDate || data.datum || data.date;
      }

      // Extract store name and clean it
      // Format is often: "1235237-287 - Maxi" or similar
      if (data.storeName || data.prodavnica || data.seller || data.shopName) {
        rawStoreName = data.storeName || data.prodavnica || data.seller || data.shopName;
        if (rawStoreName) {
          storeName = this.extractCleanStoreName(rawStoreName);
          this.logger.log(`API - Found store name - Raw: "${rawStoreName}", Clean: "${storeName}"`);
        }
      } else {
        this.logger.log('API - No store name found in response data');
      }

      // Extract location from API data
      if (data.location || data.address || data.adresa) {
        shopLocation = data.location || data.address || data.adresa;
        this.logger.log(`API - Found location: "${shopLocation}"`);
      }

      // Extract receipt ID from API data
      if (data.receiptId || data.receiptNumber || data.pfrBroj) {
        receiptId = data.receiptId || data.receiptNumber || data.pfrBroj;
        this.logger.log(`API - Found receipt ID: "${receiptId}"`);
      }

      // Parse items
      for (const item of items) {
        const product: ReceiptProductDto = {
          product: this.extractProductName(item),
          quantity: this.extractQuantity(item),
        };

        products.push(product);
      }

      // Check if products exist in database
      await this.checkProductsExistence(products);

      // Look up shop by rawStoreName, create if doesn't exist
      let shopId: string | undefined;
      if (rawStoreName) {
        let shop = await this.shopsService.findByName(rawStoreName);

        // Auto-create shop if it doesn't exist
        if (!shop) {
          this.logger.log(`Creating new shop: "${rawStoreName}" (location: "${shopLocation || 'Unknown'}")`);
          shop = await this.shopsService.create({
            name: rawStoreName,
            location: shopLocation || 'Unknown',
          });
        }

        if (shop) {
          shopId = shop.id;
        }
      }

      return {
        products,
        receiptDate,
        storeName,
        rawStoreName,
        shopId,
        receiptId,
        shopLocation,
      };
    } catch (error) {
      this.logger.error('Error parsing receipt data:', error);
      throw new HttpException(
        'Failed to parse receipt data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async checkProductsExistence(products: ReceiptProductDto[]): Promise<void> {
    for (const product of products) {
      const existingProduct = await this.productsService.findByName(product.product);

      if (existingProduct) {
        product.doesExist = true;
        product.pointValue = existingProduct.pointValue;
      } else {
        product.doesExist = false;
        product.pointValue = 0;
      }
    }
  }

  private extractProductName(item: any): string {
    // Try different field names for product name
    return (
      item.name ||
      item.naziv ||
      item.description ||
      item.opis ||
      item.productName ||
      item.artikal ||
      'Unknown Product'
    );
  }

  private extractQuantity(item: any): number {
    // Try different field names for quantity
    const qty =
      item.quantity ||
      item.kolicina ||
      item.qty ||
      item.amount ||
      item.amount ||
      1;

    return parseFloat(qty) || 1;
  }

  private extractCleanStoreName(rawStoreName: string): string {
    // Format can be:
    // "1235237-287 - Maxi" -> extract "Maxi"
    // "1054272-Bomax doo" -> extract "Bomax doo"

    // First try: "number-number - Name" format
    let match = rawStoreName.match(/\d+-\d+\s*-\s*(.+)/);
    if (match) {
      return match[1].trim();
    }

    // Second try: "number-Name" format
    match = rawStoreName.match(/\d+-(.+)/);
    if (match) {
      return match[1].trim();
    }

    // If no match, return the raw name cleaned up
    return rawStoreName.trim();
  }

  private async parseReceiptFromHtml(html: string): Promise<ProcessReceiptResponseDto> {
    try {
      const $ = cheerio.load(html);
      const products: ReceiptProductDto[] = [];
      let receiptDate: string | undefined;
      let storeName: string | undefined;
      let rawStoreName: string | undefined;

      // Serbian fiscal receipts are displayed as plain text in a preformatted section
      // Extract the text content and parse it line by line
      const receiptText = $('body').text();

      // Split into lines for parsing
      const lines = receiptText.split('\n');

      // Track if we're in the products section
      let inProductsSection = false;
      let currentProduct: { name?: string; price?: number; qty?: number; total?: number } = {};
      let shopLocation: string | undefined;
      let receiptId: string | undefined;

      // Metadata fields to skip (these are NOT products)
      const skipPatterns = [
        /за уплату:/i,
        /порез/i,
        /начин плаћања/i,
        /врста рачуна/i,
        /време на безбедносном/i,
        /бројач рачуна/i,
        /укупан износ/i,
        /готовина/i,
        /картица/i,
        /есир/i,
        /===/,
        /---/,
        /пфр број/i,
        /пиб/i,
        /адреса/i,
        /датум/i,
        /време/i,
      ];

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip empty lines
        if (!line) continue;

        // Check if we found the header line with "Назив", "Цена", "Кол.", "Укупно"
        if (line.includes('Назив') && (line.includes('Цена') || line.includes('Кол'))) {
          inProductsSection = true;
          continue;
        }

        // Stop when we hit summary sections
        if (line.match(/укупан износ|за уплату|=========/i) && inProductsSection) {
          inProductsSection = false;
        }

        if (inProductsSection) {
          // Skip lines that match metadata patterns
          if (skipPatterns.some(pattern => pattern.test(line))) {
            continue;
          }

          // Serbian receipts typically have two-line format:
          // Line 1: Product name
          // Line 2: Price, Quantity, Total (separated by spaces)

          // Check if line contains numbers (likely price/qty/total line)
          const numberMatch = line.match(/(\d+[.,]\d+)\s+(\d+[.,]?\d*)\s+(\d+[.,]\d+)/);

          if (numberMatch) {
            // This is a numbers line (price, qty, total)
            const unitPrice = parseFloat(numberMatch[1].replace(',', '.'));
            const quantity = parseFloat(numberMatch[2].replace(',', '.'));
            const totalPrice = parseFloat(numberMatch[3].replace(',', '.'));

            currentProduct.price = unitPrice;
            currentProduct.qty = quantity;
            currentProduct.total = totalPrice;

            // If we have a product name from previous line, save it
            if (currentProduct.name) {
              products.push({
                product: currentProduct.name,
                quantity: currentProduct.qty || 1,
              });

              // Reset for next product
              currentProduct = {};
            }
          } else if (line.length > 3 && !line.match(/^\d+$/)) {
            // This looks like a product name line
            // Clean up the line (remove tax indicators like (Ђ), (Е), etc.)
            const cleanName = line.replace(/\([ЂЕЃABC]\)/gi, '').trim();

            if (cleanName && !skipPatterns.some(pattern => pattern.test(cleanName))) {
              currentProduct.name = cleanName;
            }
          }
        }

        // Extract store name (formats: "1235237-287 - Maxi" or "1054272-Bomax doo")
        // Usually found near the top of the receipt
        if (!rawStoreName && line.match(/\d+-[A-Za-zА-Яа-я0-9\s]+/)) {
          rawStoreName = line.trim();
          storeName = this.extractCleanStoreName(rawStoreName);
          this.logger.log(`Found store name - Raw: "${rawStoreName}", Clean: "${storeName}"`);

          // The next non-empty line is the location
          // Look ahead in the lines array starting from current position
          this.logger.log(`Searching for location after shop name, starting at line ${i + 1}`);
          for (let j = i + 1; j < lines.length && j < i + 10; j++) { // Check up to 10 lines ahead
            const nextLine = lines[j].trim();
            this.logger.log(`Line ${j}: "${nextLine}" (length: ${nextLine.length})`);

            if (nextLine.length > 0) {
              // Skip metadata labels and the word "Адреса" (Address label)
              const isMetadataLabel = nextLine.match(/^(ПИБ|Датум|Време|Назив|Цена|Кол):/i);
              const isProductHeader = nextLine.match(/Назив.*Цена.*Кол/i);
              const isAnotherShopId = nextLine.match(/^\d+-[A-Za-zА-Яа-я0-9\s]+$/);
              const isAddressLabel = nextLine.match(/^Адреса$/i) || nextLine === 'Адреса';

              this.logger.log(`  isMetadataLabel: ${!!isMetadataLabel}, isProductHeader: ${!!isProductHeader}, isAnotherShopId: ${!!isAnotherShopId}, isAddressLabel: ${!!isAddressLabel}`);

              if (isAddressLabel) {
                // If we find "Адреса", skip it and continue to next line
                this.logger.log(`Found 'Адреса' label, continuing to next line...`);
                continue;
              }

              if (!isMetadataLabel && !isProductHeader && !isAnotherShopId) {
                shopLocation = nextLine;
                this.logger.log(`✓ Found shop location: "${shopLocation}"`);
                break; // Found the location, stop searching
              } else {
                this.logger.log(`✗ Skipped line as non-location: "${nextLine}"`);
              }
            }
          }

          if (!shopLocation) {
            this.logger.warn('No shop location found after scanning lines');
          }
        }

        // Extract date
        if (line.match(/датум и време продaje/i) || line.match(/\d{2}[.\/]\d{2}[.\/]\d{4}/)) {
          const dateMatch = line.match(/(\d{2}[.\/]\d{2}[.\/]\d{4}\s+\d{2}:\d{2}:\d{2})/);
          if (dateMatch) {
            receiptDate = dateMatch[1];
          }
        }

        // Extract receipt ID (format: "M4XG7WCS-M4XG7WCS-56122")
        if (line.match(/ПФР број рачуна/i)) {
          const idMatch = line.match(/ПФР број рачуна:\s*([A-Z0-9]+-[A-Z0-9]+-[0-9]+)/i);
          if (idMatch) {
            receiptId = idMatch[1];
            this.logger.log(`Found receipt ID: "${receiptId}"`);
          }
        }
      }

      if (products.length === 0) {
        this.logger.warn('No products found, receipt text preview: ' + receiptText.substring(0, 500));
        throw new HttpException(
          'No products found in receipt. The receipt format may not be supported.',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      // Check if products exist in database
      await this.checkProductsExistence(products);

      // Look up shop by rawStoreName, create if doesn't exist
      let shopId: string | undefined;
      if (rawStoreName) {
        let shop = await this.shopsService.findByName(rawStoreName);

        // Auto-create shop if it doesn't exist
        if (!shop) {
          this.logger.log(`Creating new shop: "${rawStoreName}" (location: "${shopLocation || 'Unknown'}")`);
          shop = await this.shopsService.create({
            name: rawStoreName,
            location: shopLocation || 'Unknown',
          });
        }

        if (shop) {
          shopId = shop.id;
        }
      }

      return {
        products,
        receiptDate,
        storeName,
        rawStoreName,
        shopId,
        receiptId,
        shopLocation,
      };
    } catch (error) {
      this.logger.error('Error parsing HTML receipt:', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to parse receipt HTML',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async collectPoints(
    userId: string,
    receiptData: ProcessReceiptResponseDto,
  ): Promise<{ message: string; pointsAwarded: number; transactionId: string }> {
    try {
      // Check if receipt has already been processed
      if (receiptData.receiptId) {
        const existingTransaction = await this.transactionsService.findByReceiptId(receiptData.receiptId);
        if (existingTransaction) {
          throw new HttpException(
            'This receipt has already been used to collect points',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      // Calculate total points from approved products (those with pointValue > 0)
      const approvedProducts = receiptData.products.filter(
        (p) => p.doesExist && (p.pointValue || 0) > 0,
      );

      if (approvedProducts.length === 0) {
        throw new HttpException(
          'No approved products to collect points from',
          HttpStatus.BAD_REQUEST,
        );
      }

      const totalPoints = approvedProducts.reduce((sum, product) => {
        return sum + (product.pointValue || 0) * product.quantity;
      }, 0);

      if (totalPoints <= 0) {
        throw new HttpException(
          'No points to collect',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Ensure we have a shop ID
      if (!receiptData.shopId) {
        throw new HttpException(
          'Shop information is required to collect points',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Get product entities for the transaction
      const productEntities: Product[] = [];
      for (const product of approvedProducts) {
        const productEntity = await this.productsService.findByName(product.product);
        if (productEntity) {
          productEntities.push(productEntity);
        }
      }

      // Create transaction
      const transaction = await this.transactionsService.create({
        userId,
        shopId: receiptData.shopId,
        date: receiptData.receiptDate ? new Date(receiptData.receiptDate) : new Date(),
        points: totalPoints,
        products: productEntities,
        receiptId: receiptData.receiptId,
      });

      // Add points to user
      await this.pointsService.addPoints(userId, totalPoints);

      return {
        message: 'Points collected successfully',
        pointsAwarded: totalPoints,
        transactionId: transaction.id,
      };
    } catch (error) {
      this.logger.error('Error collecting points:', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'An error occurred while collecting points',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
