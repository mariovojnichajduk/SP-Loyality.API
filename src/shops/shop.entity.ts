import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { Transaction } from '../transactions/transaction.entity';

@Entity('shops')
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  cleanedName: string;

  @Column()
  location: string;

  @Column({ type: 'integer', default: 0 })
  additionalPoints: number;

  @OneToMany(() => Product, (product) => product.shop)
  products: Product[];

  @OneToMany(() => Transaction, (transaction) => transaction.shop)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
