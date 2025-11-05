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
    description: 'Whether the product exists in the database',
    example: true,
    required: false,
  })
  doesExist?: boolean;

  @ApiProperty({
    description: 'Points value of the product (0 if product does not exist)',
    example: 10,
    required: false,
  })
  pointValue?: number;
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
