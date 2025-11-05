import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ReceiptsService } from './receipts.service';
import { ProcessReceiptDto } from './dto/process-receipt.dto';
import { ProcessReceiptResponseDto } from './dto/receipt-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @Post('collect-points')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Collect points from processed receipt',
    description:
      'Creates a transaction record and awards points to the user for approved products in the receipt.',
  })
  @ApiResponse({
    status: 200,
    description: 'Points collected successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid receipt data or no points to collect',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async collectPoints(
    @Request() req,
    @Body() body: { receiptData: ProcessReceiptResponseDto },
  ): Promise<{ message: string; pointsAwarded: number; transactionId: string }> {
    return this.receiptsService.collectPoints(req.user.userId, body.receiptData);
  }
}
