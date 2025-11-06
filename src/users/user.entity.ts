import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';
import { ApprovalRequest } from '../approval-requests/approval-request.entity';
import { Shop } from '../shops/shop.entity';
import { Redemption } from '../rewards/redemption.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ManyToMany(() => Shop)
  @JoinTable({
    name: 'user_favorite_shops',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'shopId', referencedColumnName: 'id' },
  })
  favoriteShops: Shop[];

  @Column({ type: 'integer', default: 0 })
  points: number;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  verificationCode: string;

  @Column({ nullable: true })
  verificationCodeExpiry: Date;

  @Column({ nullable: true })
  passwordResetCode: string;

  @Column({ nullable: true })
  passwordResetCodeExpiry: Date;

  @Column({ unique: true, nullable: true })
  invitationCode: string;

  @ManyToMany(() => User, (user) => user.familyMembers)
  @JoinTable({
    name: 'family_members',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'familyMemberId', referencedColumnName: 'id' },
  })
  familyMembers: User[];

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => ApprovalRequest, (approvalRequest) => approvalRequest.user)
  approvalRequests: ApprovalRequest[];

  @OneToMany(() => Redemption, (redemption) => redemption.user)
  redemptions: Redemption[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
