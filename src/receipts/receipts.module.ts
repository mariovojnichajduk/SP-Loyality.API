import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { ProductsModule } from '../products/products.module';
import { ShopsModule } from '../shops/shops.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { PointsModule } from '../points/points.module';

@Module({
  imports: [ProductsModule, ShopsModule, TransactionsModule, PointsModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
  exports: [ReceiptsService],
})
export class ReceiptsModule {}
