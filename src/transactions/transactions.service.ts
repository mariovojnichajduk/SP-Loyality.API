import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { TransactionProduct } from './transaction-product.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(TransactionProduct)
    private transactionProductsRepository: Repository<TransactionProduct>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      relations: ['user', 'shop', 'transactionProducts', 'transactionProducts.product'],
    });
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactionsRepository.findOne({
      where: { id },
      relations: ['user', 'shop', 'transactionProducts', 'transactionProducts.product'],
    });
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: { userId },
      relations: ['shop', 'transactionProducts', 'transactionProducts.product'],
      order: { date: 'DESC' },
    });
  }

  async findByShopId(shopId: string): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: { shopId },
      relations: ['user', 'transactionProducts', 'transactionProducts.product'],
      order: { date: 'DESC' },
    });
  }

  async create(transactionData: Partial<Transaction>): Promise<Transaction> {
    const transaction = this.transactionsRepository.create(transactionData);
    return this.transactionsRepository.save(transaction);
  }

  async delete(id: string): Promise<void> {
    await this.transactionsRepository.delete(id);
  }

  async findByReceiptId(receiptId: string): Promise<Transaction | null> {
    return this.transactionsRepository.findOne({
      where: { receiptId },
    });
  }

  async findTransactionsWithUnpaidProduct(productId: string): Promise<TransactionProduct[]> {
    return this.transactionProductsRepository.find({
      where: {
        productId,
        pointsAwarded: false,
      },
      relations: ['transaction', 'transaction.user', 'product'],
    });
  }

  async createTransactionProduct(
    transactionId: string,
    productId: string,
    quantity: number,
    pointsValue: number,
    pointsAwarded: boolean,
  ): Promise<TransactionProduct> {
    const transactionProduct = this.transactionProductsRepository.create({
      transactionId,
      productId,
      quantity,
      pointsValue,
      pointsAwarded,
    });
    return this.transactionProductsRepository.save(transactionProduct);
  }

  async markProductAsAwarded(transactionId: string, productId: string): Promise<void> {
    await this.transactionProductsRepository.update(
      { transactionId, productId },
      { pointsAwarded: true },
    );
  }
}
