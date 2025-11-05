import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { ProcessReceiptDto } from './dto/process-receipt.dto';
import {
  ReceiptProductDto,
  ProcessReceiptResponseDto,
} from './dto/receipt-product.dto';

@Injectable()
export class ReceiptsService {
  private readonly logger = new Logger(ReceiptsService.name);

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

  private parseReceiptData(data: any): ProcessReceiptResponseDto {
    try {
      const products: ReceiptProductDto[] = [];

      // The structure will depend on the actual API response
      // Common patterns in Serbian fiscal receipts:
      // - items, stavke, products, or similar field for line items
      // - quantity fields: kolicina, qty, quantity
      // - product name: naziv, name, description

      let items: any[] = [];
      let totalAmount: number | undefined;
      let receiptDate: string | undefined;
      let storeName: string | undefined;

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

      // Extract total amount
      if (data.totalAmount !== undefined) {
        totalAmount = parseFloat(data.totalAmount);
      } else if (data.ukupanIznos !== undefined) {
        totalAmount = parseFloat(data.ukupanIznos);
      } else if (data.total !== undefined) {
        totalAmount = parseFloat(data.total);
      }

      // Extract receipt date
      if (data.receiptDate || data.datum || data.date) {
        receiptDate = data.receiptDate || data.datum || data.date;
      }

      // Extract store name
      if (data.storeName || data.prodavnica || data.seller) {
        storeName = data.storeName || data.prodavnica || data.seller;
      }

      // Parse items
      for (const item of items) {
        const product: ReceiptProductDto = {
          product: this.extractProductName(item),
          quantity: this.extractQuantity(item),
        };

        // Extract optional fields
        const unitPrice = this.extractUnitPrice(item);
        const totalPrice = this.extractTotalPrice(item);

        if (unitPrice !== undefined) {
          product.unitPrice = unitPrice;
        }

        if (totalPrice !== undefined) {
          product.totalPrice = totalPrice;
        }

        products.push(product);
      }

      return {
        products,
        totalAmount,
        receiptDate,
        storeName,
      };
    } catch (error) {
      this.logger.error('Error parsing receipt data:', error);
      throw new HttpException(
        'Failed to parse receipt data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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

  private extractUnitPrice(item: any): number | undefined {
    const price =
      item.unitPrice ||
      item.cena ||
      item.price ||
      item.jedinicnaCena ||
      item.unit_price;

    return price !== undefined ? parseFloat(price) : undefined;
  }

  private extractTotalPrice(item: any): number | undefined {
    const total =
      item.totalPrice ||
      item.ukupno ||
      item.total ||
      item.iznos ||
      item.total_price;

    return total !== undefined ? parseFloat(total) : undefined;
  }

  private parseReceiptFromHtml(html: string): ProcessReceiptResponseDto {
    try {
      const $ = cheerio.load(html);
      const products: ReceiptProductDto[] = [];
      let totalAmount: number | undefined;
      let receiptDate: string | undefined;
      let storeName: string | undefined;

      // Serbian fiscal receipts are displayed as plain text in a preformatted section
      // Extract the text content and parse it line by line
      const receiptText = $('body').text();

      // Split into lines for parsing
      const lines = receiptText.split('\n');

      // Track if we're in the products section
      let inProductsSection = false;
      let currentProduct: { name?: string; price?: number; qty?: number; total?: number } = {};

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
                unitPrice: currentProduct.price,
                totalPrice: currentProduct.total,
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

        // Extract total amount
        if (line.match(/укупан износ/i)) {
          const amountMatch = line.match(/(\d+[.,]\d+)/);
          if (amountMatch) {
            totalAmount = parseFloat(amountMatch[1].replace(',', '.'));
          }
        }

        // Extract date
        if (line.match(/датум и време продaje/i) || line.match(/\d{2}[.\/]\d{2}[.\/]\d{4}/)) {
          const dateMatch = line.match(/(\d{2}[.\/]\d{2}[.\/]\d{4}\s+\d{2}:\d{2}:\d{2})/);
          if (dateMatch) {
            receiptDate = dateMatch[1];
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

      return {
        products,
        totalAmount,
        receiptDate,
        storeName,
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
}
