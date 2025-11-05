import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { Transaction } from '../transactions/transaction.entity';
import { ApprovalRequest } from '../approval-requests/approval-request.entity';
import { User } from '../users/user.entity';
import { Shop } from '../shops/shop.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction, ApprovalRequest, User, Shop]),
  ],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
