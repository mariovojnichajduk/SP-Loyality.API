import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

export enum RewardStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  OUT_OF_STOCK = 'out_of_stock',
}

@Entity('rewards')
export class Reward extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'integer' })
  pointsCost: number;

  @Column({ type: 'integer', nullable: true })
  stock: number | null; // null means unlimited

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string | null;

  @Column({
    type: 'enum',
    enum: RewardStatus,
    default: RewardStatus.ACTIVE,
  })
  status: RewardStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
