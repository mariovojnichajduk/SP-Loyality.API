import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovalRequest } from './approval-request.entity';
import { ApprovalRequestsService } from './approval-requests.service';
import { ApprovalRequestsController } from './approval-requests.controller';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ApprovalRequest, User, Product])],
  controllers: [ApprovalRequestsController],
  providers: [ApprovalRequestsService],
  exports: [ApprovalRequestsService],
})
export class ApprovalRequestsModule {}
