import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reward, RewardStatus } from './reward.entity';
import { Redemption, RedemptionStatus } from './redemption.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private rewardsRepository: Repository<Reward>,
    @InjectRepository(Redemption)
    private redemptionsRepository: Repository<Redemption>,
    private usersService: UsersService,
  ) {}

  // Get all active rewards
  async findAllActive(): Promise<Reward[]> {
    return this.rewardsRepository.find({
      where: { status: RewardStatus.ACTIVE },
      order: { pointsCost: 'ASC' },
    });
  }

  // Get all rewards (admin)
  async findAll(): Promise<Reward[]> {
    return this.rewardsRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // Get reward by ID
  async findById(id: string): Promise<Reward | null> {
    return this.rewardsRepository.findOne({ where: { id } });
  }

  // Create a new reward (admin)
  async create(rewardData: Partial<Reward>): Promise<Reward> {
    const reward = this.rewardsRepository.create(rewardData);
    return this.rewardsRepository.save(reward);
  }

  // Update reward (admin)
  async update(id: string, rewardData: Partial<Reward>): Promise<Reward> {
    await this.rewardsRepository.update(id, rewardData);
    const updatedReward = await this.findById(id);
    if (!updatedReward) {
      throw new NotFoundException(`Reward with id ${id} not found`);
    }
    return updatedReward;
  }

  // Delete reward (admin)
  async delete(id: string): Promise<void> {
    await this.rewardsRepository.delete(id);
  }

  // Redeem a reward
  async redeemReward(userId: string, rewardId: string): Promise<Redemption> {
    // Get the reward
    const reward = await this.findById(rewardId);
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }

    // Check if reward is active
    if (reward.status !== RewardStatus.ACTIVE) {
      throw new BadRequestException('This reward is not available');
    }

    // Check stock
    if (reward.stock !== null && reward.stock <= 0) {
      throw new BadRequestException('This reward is out of stock');
    }

    // Get user
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if user has enough points
    if (user.points < reward.pointsCost) {
      throw new BadRequestException(
        `Insufficient points. You need ${reward.pointsCost} points but only have ${user.points}`,
      );
    }

    // Deduct points from user
    await this.usersService.update(userId, {
      points: user.points - reward.pointsCost,
    });

    // Decrease stock if not unlimited
    if (reward.stock !== null) {
      await this.rewardsRepository.update(rewardId, {
        stock: reward.stock - 1,
      });

      // Update status if out of stock
      if (reward.stock - 1 === 0) {
        await this.rewardsRepository.update(rewardId, {
          status: RewardStatus.OUT_OF_STOCK,
        });
      }
    }

    // Create redemption record
    const redemption = this.redemptionsRepository.create({
      userId,
      rewardId,
      pointsSpent: reward.pointsCost,
      status: RedemptionStatus.PENDING,
    });

    return this.redemptionsRepository.save(redemption);
  }

  // Get user's redemption history
  async getUserRedemptions(userId: string): Promise<Redemption[]> {
    return this.redemptionsRepository.find({
      where: { userId },
      relations: ['reward'],
      order: { createdAt: 'DESC' },
    });
  }

  // Get all redemptions (admin)
  async getAllRedemptions(): Promise<Redemption[]> {
    return this.redemptionsRepository.find({
      relations: ['user', 'reward'],
      order: { createdAt: 'DESC' },
    });
  }

  // Update redemption status (admin)
  async updateRedemptionStatus(
    redemptionId: string,
    status: RedemptionStatus,
  ): Promise<Redemption> {
    await this.redemptionsRepository.update(redemptionId, { status });
    const redemption = await this.redemptionsRepository.findOne({
      where: { id: redemptionId },
      relations: ['user', 'reward'],
    });

    if (!redemption) {
      throw new NotFoundException('Redemption not found');
    }

    // If cancelled, refund points
    if (status === RedemptionStatus.CANCELLED) {
      const user = await this.usersService.findById(redemption.userId);
      if (user) {
        await this.usersService.update(redemption.userId, {
          points: user.points + redemption.pointsSpent,
        });

        // Restore stock
        const reward = await this.findById(redemption.rewardId);
        if (reward && reward.stock !== null) {
          await this.rewardsRepository.update(redemption.rewardId, {
            stock: reward.stock + 1,
            status: RewardStatus.ACTIVE, // Make it active again
          });
        }
      }
    }

    return redemption;
  }
}
