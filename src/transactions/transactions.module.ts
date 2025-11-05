import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { TransactionProduct } from './transaction-product.entity';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, TransactionProduct])],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
