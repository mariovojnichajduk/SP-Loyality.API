import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductApprovalRequest } from './product-approval-request.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { UsersModule } from '../users/users.module';
import { ShopsModule } from '../shops/shops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductApprovalRequest]),
    UsersModule,
    ShopsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
