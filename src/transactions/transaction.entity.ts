import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Shop } from '../shops/shop.entity';
import { Product } from '../products/product.entity';

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

  @ManyToOne(() => User, (user) => user.transactions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Shop, (shop) => shop.transactions)
  @JoinColumn({ name: 'shopId' })
  shop: Shop;

  @ManyToMany(() => Product, (product) => product.transactions)
  @JoinTable({
    name: 'transaction_products',
    joinColumn: { name: 'transactionId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
  })
  products: Product[];

  @CreateDateColumn()
  createdAt: Date;
}
