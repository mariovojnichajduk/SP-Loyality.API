import {
  Controller,
  Get,
  Post,
  Body,
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
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RewardsService } from './rewards.service';
import { RedeemRewardDto } from './dto/redeem-reward.dto';

@ApiTags('rewards')
@Controller('api/rewards')
export class RewardsController {
  constructor(private rewardsService: RewardsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all active rewards (public or authenticated)' })
  @ApiResponse({
    status: 200,
    description: 'List of active rewards',
    schema: {
      example: [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Free Coffee',
          description: 'Get a free coffee at any participating store',
          pointsCost: 100,
          stock: 50,
          imageUrl: 'https://example.com/coffee.jpg',
          status: 'active',
          createdAt: '2025-11-06T10:00:00.000Z',
        },
      ],
    },
  })
  async getAllActiveRewards() {
    return this.rewardsService.findAllActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get reward details by ID' })
  @ApiResponse({
    status: 200,
    description: 'Reward details',
  })
  @ApiResponse({
    status: 404,
    description: 'Reward not found',
  })
  async getRewardById(@Param('id') id: string) {
    const reward = await this.rewardsService.findById(id);
    if (!reward) {
      throw new BadRequestException('Reward not found');
    }
    return reward;
  }

  @Post('redeem')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Redeem a reward with points' })
  @ApiResponse({
    status: 201,
    description: 'Reward redeemed successfully',
    schema: {
      example: {
        id: 'redemption-uuid',
        userId: 'user-uuid',
        rewardId: 'reward-uuid',
        pointsSpent: 100,
        status: 'pending',
        createdAt: '2025-11-06T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Insufficient points or reward unavailable',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async redeemReward(@Request() req, @Body() redeemDto: RedeemRewardDto) {
    const userId = req.user.userId;
    return this.rewardsService.redeemReward(userId, redeemDto.rewardId);
  }

  @Get('user/redemptions')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user redemption history' })
  @ApiResponse({
    status: 200,
    description: 'List of user redemptions',
    schema: {
      example: [
        {
          id: 'redemption-uuid',
          userId: 'user-uuid',
          rewardId: 'reward-uuid',
          pointsSpent: 100,
          status: 'completed',
          reward: {
            name: 'Free Coffee',
            description: 'Get a free coffee',
          },
          createdAt: '2025-11-06T10:00:00.000Z',
        },
      ],
    },
  })
  async getUserRedemptions(@Request() req) {
    const userId = req.user.userId;
    return this.rewardsService.getUserRedemptions(userId);
  }
}
