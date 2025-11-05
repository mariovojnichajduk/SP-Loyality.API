import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  BaseEntity,
} from 'typeorm';
import { Transaction } from './transaction.entity';
import { Product } from '../products/product.entity';

@Entity('transaction_products')
export class TransactionProduct extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  transactionId: string;

  @PrimaryColumn({ type: 'uuid' })
  productId: string;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'boolean', default: false })
  pointsAwarded: boolean;

  @Column({ type: 'integer', default: 0 })
  pointsValue: number;

  @ManyToOne(() => Transaction, (transaction) => transaction.transactionProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'transactionId' })
  transaction: Transaction;

  @ManyToOne(() => Product, (product) => product.transactionProducts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @CreateDateColumn()
  createdAt: Date;
}
