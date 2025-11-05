import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [ProductsModule],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
  exports: [ReceiptsService],
})
export class ReceiptsModule {}
