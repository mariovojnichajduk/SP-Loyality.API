import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Shop } from '../shops/shop.entity';
import { TransactionProduct } from './transaction-product.entity';

@Entity('transactions')
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  shopId: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'integer' })
  points: number;

  @Column({ type: 'varchar', nullable: true, unique: true })
  receiptId: string;

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Shop, (shop) => shop.transactions)
  @JoinColumn({ name: 'shopId' })
  shop: Shop;

  @OneToMany(() => TransactionProduct, (tp) => tp.transaction)
  transactionProducts: TransactionProduct[];

  @CreateDateColumn()
  createdAt: Date;
}
