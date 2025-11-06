import { Injectable, HttpException, HttpStatus, Logger, Inject, forwardRef } from '@nestjs/common';
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
    @Inject(forwardRef(() => ProductsService))
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
        }
      }

      // Extract location from API data
      if (data.location || data.address || data.adresa) {
        shopLocation = data.location || data.address || data.adresa;
      }

      // Extract receipt ID from API data
      if (data.receiptId || data.receiptNumber || data.pfrBroj) {
        receiptId = data.receiptId || data.receiptNumber || data.pfrBroj;
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

        if (!shop) {
          shop = await this.shopsService.create({
            name: rawStoreName,
            cleanedName: storeName,
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

  private extractShopLocation(lines: string[], startIndex: number): string | undefined {
    // Extract shop location from lines following the shop name
    // Location is typically on the next line after rawStoreName, may have "Адреса" label before it

    for (let i = startIndex + 1; i < lines.length && i < startIndex + 10; i++) {
      const line = lines[i].trim();

      if (line.length === 0) continue;

      // Skip metadata labels and product headers
      const isMetadataLabel = line.match(/^(ПИБ|Датум|Време|Назив|Цена|Кол):/i);
      const isProductHeader = line.match(/Назив.*Цена.*Кол/i);
      const isAnotherShopId = line.match(/^\d+-[A-Za-zА-Яа-я0-9\s]+$/);
      const isAddressLabel = line.match(/^Адреса$/i) || line === 'Адреса';

      // Skip "Адреса" label and continue searching
      if (isAddressLabel) {
        continue;
      }

      // If line doesn't match skip patterns, it's the location
      if (!isMetadataLabel && !isProductHeader && !isAnotherShopId) {
        return line;
      }
    }

    return undefined;
  }

  private extractReceiptId(line: string): string | undefined {
    // Extract receipt ID in format: "M4XG7WCS-M4XG7WCS-56122"
    if (line.match(/ПФР број рачуна/i)) {
      const idMatch = line.match(/ПФР број рачуна:\s*([A-Z0-9]+-[A-Z0-9]+-[0-9]+)/i);
      if (idMatch) {
        return idMatch[1];
      }
    }
    return undefined;
  }

  private extractReceiptDate(line: string): string | undefined {
    // Extract date and time from receipt
    if (line.match(/датум и време продaje/i) || line.match(/\d{2}[.\/]\d{2}[.\/]\d{4}/)) {
      const dateMatch = line.match(/(\d{2}[.\/]\d{2}[.\/]\d{4}\s+\d{2}:\d{2}:\d{2})/);
      if (dateMatch) {
        return dateMatch[1];
      }
    }
    return undefined;
  }

  private parseProductLine(line: string, currentProduct: any, products: ReceiptProductDto[]): any {
    // Check if line contains price/quantity/total numbers
    const numberMatch = line.match(/(\d+[.,]\d+)\s+(\d+[.,]?\d*)\s+(\d+[.,]\d+)/);

    if (numberMatch) {
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
        return {}; // Reset for next product
      }
    } else if (line.length > 3 && !line.match(/^\d+$/)) {
      // This looks like a product name line
      const cleanName = line.replace(/\([ЂЕЃABC]\)/gi, '').trim();
      if (cleanName) {
        currentProduct.name = cleanName;
      }
    }

    return currentProduct;
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

          currentProduct = this.parseProductLine(line, currentProduct, products);
        }

        // Extract store name (formats: "1235237-287 - Maxi" or "1054272-Bomax doo")
        if (!rawStoreName && line.match(/\d+-[A-Za-zА-Яа-я0-9\s]+/)) {
          rawStoreName = line.trim();
          storeName = this.extractCleanStoreName(rawStoreName);
          shopLocation = this.extractShopLocation(lines, i);
        }

        // Extract date
        if (!receiptDate) {
          const extractedDate = this.extractReceiptDate(line);
          if (extractedDate) {
            receiptDate = extractedDate;
          }
        }

        // Extract receipt ID
        if (!receiptId) {
          const extractedId = this.extractReceiptId(line);
          if (extractedId) {
            receiptId = extractedId;
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

        if (!shop) {
          shop = await this.shopsService.create({
            name: rawStoreName,
            cleanedName: storeName,
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

      // Ensure we have a shop ID
      if (!receiptData.shopId) {
        throw new HttpException(
          'Shop information is required to collect points',
          HttpStatus.BAD_REQUEST,
        );
      }

      // Separate products by existence and approval status
      const approvedProducts = receiptData.products.filter(
        (p) => p.doesExist && (p.pointValue || 0) > 0,
      );

      const existingUnapprovedProducts = receiptData.products.filter(
        (p) => p.doesExist && (p.pointValue || 0) === 0,
      );

      const newProducts = receiptData.products.filter(
        (p) => !p.doesExist,
      );

      // Calculate total points from approved products only
      const totalPoints = approvedProducts.reduce((sum, product) => {
        return sum + (product.pointValue || 0) * product.quantity;
      }, 0);

      // Create transaction (even if no points awarded yet, to track the receipt)
      const transaction = await this.transactionsService.create({
        userId,
        shopId: receiptData.shopId,
        date: receiptData.receiptDate ? new Date(receiptData.receiptDate) : new Date(),
        points: totalPoints,
        receiptId: receiptData.receiptId,
      });

      // Create transaction-product records for approved products (points awarded)
      for (const product of approvedProducts) {
        const productEntity = await this.productsService.findByName(product.product);
        if (productEntity) {
          await this.transactionsService.createTransactionProduct(
            transaction.id,
            productEntity.id,
            product.quantity,
            (product.pointValue || 0) * product.quantity,
            true, // Points awarded
          );
        }
      }

      // Create transaction-product records for existing unapproved products (points NOT awarded yet)
      for (const product of existingUnapprovedProducts) {
        const productEntity = await this.productsService.findByName(product.product);
        if (productEntity) {
          await this.transactionsService.createTransactionProduct(
            transaction.id,
            productEntity.id,
            product.quantity,
            0, // No points yet
            false, // Points not awarded
          );
        }
      }

      // Create new products and transaction-product records for products that don't exist yet
      for (const product of newProducts) {
        // Create the product with isApproved: false and request approval
        const productEntity = await this.productsService.requestProductApproval(
          userId,
          product.product,
          receiptData.shopId,
          receiptData.rawStoreName,
        );

        // Create transaction-product record for this new product
        await this.transactionsService.createTransactionProduct(
          transaction.id,
          productEntity.id,
          product.quantity,
          0, // No points yet (unapproved)
          false, // Points not awarded
        );
      }

      // Add points to user (only for approved products)
      if (totalPoints > 0) {
        await this.pointsService.addPoints(userId, totalPoints);
      }

      return {
        message: totalPoints > 0
          ? 'Points collected successfully'
          : 'Receipt saved. Points will be awarded when products are approved.',
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

  async awardPendingPointsForProduct(productId: string): Promise<{
    usersAwarded: number;
    totalPointsAwarded: number;
  }> {
    try {
      // Find all transaction-product records where this product hasn't awarded points yet
      const unpaidTransactionProducts = await this.transactionsService.findTransactionsWithUnpaidProduct(productId);

      if (unpaidTransactionProducts.length === 0) {
        return {
          usersAwarded: 0,
          totalPointsAwarded: 0,
        };
      }

      // Get the product to find its point value
      const product = await this.productsService.findById(productId);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      let totalPointsAwarded = 0;
      const uniqueUsers = new Set<string>();

      // Award points for each transaction
      for (const tp of unpaidTransactionProducts) {
        const pointsToAward = product.pointValue * tp.quantity;

        // Update transaction total points
        const transaction = tp.transaction;
        transaction.points += pointsToAward;
        await transaction.save();

        // Award points to user
        await this.pointsService.addPoints(transaction.userId, pointsToAward);

        // Mark this transaction-product as awarded
        await this.transactionsService.markProductAsAwarded(tp.transactionId, productId);

        // Update the pointsValue in junction table
        tp.pointsValue = pointsToAward;
        await tp.save();

        totalPointsAwarded += pointsToAward;
        uniqueUsers.add(transaction.userId);
      }

      this.logger.log(
        `Awarded ${totalPointsAwarded} points to ${uniqueUsers.size} users for product ${product.name}`,
      );

      return {
        usersAwarded: uniqueUsers.size,
        totalPointsAwarded,
      };
    } catch (error) {
      this.logger.error('Error awarding pending points:', error);

      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'An error occurred while awarding pending points',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
