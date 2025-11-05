import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  BaseEntity,
} from 'typeorm';
import { Shop } from '../shops/shop.entity';
import { Transaction } from '../transactions/transaction.entity';

export enum ProductStatus {
  AVAILABLE = 'available',
  UNAVAILABLE = 'unavailable',
}

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'integer' })
  pointValue: number;

  @Column({ type: 'boolean', default: false })
  isApproved: boolean;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.AVAILABLE,
  })
  status: ProductStatus;

  @Column({ type: 'uuid', nullable: true })
  shopId: string | null;

  @ManyToOne(() => Shop, (shop) => shop.products)
  @JoinColumn({ name: 'shopId' })
  shop: Shop;

  @ManyToMany(() => Transaction, (transaction) => transaction.products)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
