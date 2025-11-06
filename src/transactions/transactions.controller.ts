import {
  Controller,
  Get,
  UseGuards,
  Request,
  Param,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';

@ApiTags('transactions')
@Controller('api/transactions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('JWT-auth')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Get('my-transactions')
  @ApiOperation({ summary: 'Get all transactions for the authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'List of user transactions with products',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          date: '2025-11-05T14:30:00.000Z',
          points: 150,
          receiptId: 'M4XG7WCS-M4XG7WCS-56122',
          shop: {
            id: 'shop-uuid',
            name: 'Maxi',
            location: 'Пут Едварда Кардеља 13а',
          },
          transactionProducts: [
            {
              productId: 'product-uuid',
              quantity: 2,
              pointsValue: 100,
              pointsAwarded: true,
              product: {
                id: 'product-uuid',
                name: 'Coca Cola 0.5L',
                pointValue: 50,
                isApproved: true,
              },
            },
          ],
          createdAt: '2025-11-05T14:30:00.000Z',
        },
      ],
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getMyTransactions(@Request() req) {
    const userId = req.user.userId;
    return this.transactionsService.findByUserId(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific transaction by ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction details with products',
    schema: {
      example: {
        id: '123e4567-e89b-12d3-a456-426614174000',
        date: '2025-11-05T14:30:00.000Z',
        points: 150,
        receiptId: 'M4XG7WCS-M4XG7WCS-56122',
        shop: {
          id: 'shop-uuid',
          name: 'Maxi',
          location: 'Пут Едварда Кардеља 13а',
        },
        transactionProducts: [
          {
            productId: 'product-uuid',
            quantity: 2,
            pointsValue: 100,
            pointsAwarded: true,
            product: {
              id: 'product-uuid',
              name: 'Coca Cola 0.5L',
              pointValue: 50,
              isApproved: true,
            },
          },
        ],
        createdAt: '2025-11-05T14:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Transaction not found',
  })
  async getTransactionById(@Request() req, @Param('id') id: string) {
    const transaction = await this.transactionsService.findById(id);

    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }

    // Ensure user can only access their own transactions
    if (transaction.userId !== req.user.userId) {
      throw new NotFoundException('Transaction not found');
    }

    return transaction;
  }
}
