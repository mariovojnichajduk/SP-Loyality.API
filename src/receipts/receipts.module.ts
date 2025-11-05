import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { ProductsModule } from '../products/products.module';
import { ShopsModule } from '../shops/shops.module';

@Module({
  imports: [ProductsModule, ShopsModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
  exports: [ReceiptsService],
})
export class ReceiptsModule {}
