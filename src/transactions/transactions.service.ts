import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      relations: ['user', 'shop', 'products'],
    });
  }

  async findById(id: string): Promise<Transaction | null> {
    return this.transactionsRepository.findOne({
      where: { id },
      relations: ['user', 'shop', 'products'],
    });
  }

  async findByUserId(userId: string): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: { userId },
      relations: ['shop', 'products'],
      order: { date: 'DESC' },
    });
  }

  async findByShopId(shopId: string): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      where: { shopId },
      relations: ['user', 'products'],
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
}
