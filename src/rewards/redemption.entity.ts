import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Reward } from './reward.entity';

export enum RedemptionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('redemptions')
export class Redemption extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  rewardId: string;

  @Column({ type: 'integer' })
  pointsSpent: number;

  @Column({
    type: 'enum',
    enum: RedemptionStatus,
    default: RedemptionStatus.PENDING,
  })
  status: RedemptionStatus;

  @ManyToOne(() => User, (user) => user.redemptions)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Reward)
  @JoinColumn({ name: 'rewardId' })
  reward: Reward;

  @CreateDateColumn()
  createdAt: Date;
}
