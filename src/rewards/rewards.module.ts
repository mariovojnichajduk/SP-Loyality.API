import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './reward.entity';
import { Redemption } from './redemption.entity';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reward, Redemption]),
    UsersModule,
  ],
  controllers: [RewardsController],
  providers: [RewardsService],
  exports: [RewardsService],
})
export class RewardsModule {}
