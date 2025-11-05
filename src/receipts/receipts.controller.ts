import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReceiptsService } from './receipts.service';
import { ProcessReceiptDto } from './dto/process-receipt.dto';
import { ProcessReceiptResponseDto } from './dto/receipt-product.dto';

@ApiTags('receipts')
@Controller('receipts')
export class ReceiptsController {
  constructor(private readonly receiptsService: ReceiptsService) {}

  @Post('process')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Process Serbian fiscal receipt',
    description:
      'Extracts product information from a Serbian fiscal receipt URL (suf.purs.gov.rs). ' +
      'Returns a list of products with their quantities and prices.',
  })
  @ApiResponse({
    status: 200,
    description: 'Receipt processed successfully',
    type: ProcessReceiptResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid receipt URL',
  })
  @ApiResponse({
    status: 404,
    description: 'Receipt not found',
  })
  @ApiResponse({
    status: 422,
    description: 'Receipt format not supported or no products found',
  })
  @ApiResponse({
    status: 502,
    description: 'Failed to fetch receipt data',
  })
  async processReceipt(
    @Body() processReceiptDto: ProcessReceiptDto,
  ): Promise<ProcessReceiptResponseDto> {
    return this.receiptsService.processReceipt(processReceiptDto);
  }
}
