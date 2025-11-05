import {
  Controller,
  Get,
  Query,
  Param,
  UseGuards,
  Request,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StatisticsService } from './statistics.service';
import { User, UserRole } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@ApiTags('statistics')
@ApiBearerAuth('JWT-auth')
@Controller('statistics')
@UseGuards(JwtAuthGuard)
export class StatisticsController {
  constructor(
    private readonly statisticsService: StatisticsService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private async ensureAdmin(userId: string) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });

    if (!user || user.role !== UserRole.ADMIN) {
      throw new BadRequestException('Admin access required');
    }
  }

  @Get('overview')
  @ApiOperation({ summary: '[Admin] Get overall statistics overview' })
  @ApiResponse({ status: 200, description: 'Overall statistics' })
  async getOverview(@Request() req) {
    await this.ensureAdmin(req.user.userId);
    return this.statisticsService.getOverallStatistics();
  }

  @Get('most-scanned-products')
  @ApiOperation({
    summary: '[Admin] Get most scanned products (optionally by shop)',
  })
  @ApiQuery({ name: 'shopId', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'List of most scanned products',
  })
  async getMostScannedProducts(@Request() req, @Query('shopId') shopId?: string) {
    await this.ensureAdmin(req.user.userId);
    return this.statisticsService.getMostScannedProductsByShop(shopId);
  }

  @Get('top-performing-shops')
  @ApiOperation({ summary: '[Admin] Get top performing shops' })
  @ApiResponse({
    status: 200,
    description: 'List of top performing shops',
  })
  async getTopPerformingShops(@Request() req) {
    await this.ensureAdmin(req.user.userId);
    return this.statisticsService.getTopPerformingShops();
  }

  @Get('user-activity-trends')
  @ApiOperation({ summary: '[Admin] Get user activity trends' })
  @ApiQuery({
    name: 'period',
    required: false,
    enum: ['weekly', 'monthly'],
    description: 'Time period for trends',
  })
  @ApiResponse({
    status: 200,
    description: 'User activity trends data',
  })
  async getUserActivityTrends(
    @Request() req,
    @Query('period') period?: 'weekly' | 'monthly',
  ) {
    await this.ensureAdmin(req.user.userId);
    return this.statisticsService.getUserActivityTrends(period);
  }

  @Get('approval-request-frequency')
  @ApiOperation({ summary: '[Admin] Get approval request frequency statistics' })
  @ApiResponse({
    status: 200,
    description: 'Approval request frequency data',
  })
  async getApprovalRequestFrequency(@Request() req) {
    await this.ensureAdmin(req.user.userId);
    return this.statisticsService.getApprovalRequestFrequency();
  }

  @Get('shop-report/:shopId')
  @ApiOperation({ summary: '[Admin] Get detailed report for a specific shop' })
  @ApiResponse({
    status: 200,
    description: 'Detailed shop report',
  })
  async getShopReport(@Request() req, @Param('shopId') shopId: string) {
    await this.ensureAdmin(req.user.userId);
    try {
      return await this.statisticsService.getShopReport(shopId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
