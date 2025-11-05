import { ApiProperty } from '@nestjs/swagger';

export class ReceiptProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Coca Cola 0.5L',
  })
  product: string;

  @ApiProperty({
    description: 'Product quantity',
    example: 2,
  })
  quantity: number;

  @ApiProperty({
    description: 'Unit price',
    example: 150.00,
    required: false,
  })
  unitPrice?: number;

  @ApiProperty({
    description: 'Total price for this line item',
    example: 300.00,
    required: false,
  })
  totalPrice?: number;
}

export class ProcessReceiptResponseDto {
  @ApiProperty({
    description: 'List of products extracted from the receipt',
    type: [ReceiptProductDto],
  })
  products: ReceiptProductDto[];

  @ApiProperty({
    description: 'Receipt total amount',
    example: 1250.50,
    required: false,
  })
  totalAmount?: number;

  @ApiProperty({
    description: 'Receipt date and time',
    example: '2025-11-05T12:30:00',
    required: false,
  })
  receiptDate?: string;

  @ApiProperty({
    description: 'Store name',
    example: 'Maxi - Beograd',
    required: false,
  })
  storeName?: string;
}
