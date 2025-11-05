import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../transactions/transaction.entity';
import { ApprovalRequest, ApprovalStatus } from '../approval-requests/approval-request.entity';
import { User } from '../users/user.entity';
import { Shop } from '../shops/shop.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(ApprovalRequest)
    private approvalRequestsRepository: Repository<ApprovalRequest>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Shop)
    private shopsRepository: Repository<Shop>,
  ) {}

  // Najčešće skenirani proizvodi po prodavnici
  async getMostScannedProductsByShop(shopId?: string) {
    const query = this.transactionsRepository
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.products', 'product')
      .leftJoinAndSelect('transaction.shop', 'shop')
      .select('product.id', 'productId')
      .addSelect('product.name', 'productName')
      .addSelect('shop.id', 'shopId')
      .addSelect('shop.name', 'shopName')
      .addSelect('COUNT(product.id)', 'scanCount')
      .groupBy('product.id')
      .addGroupBy('product.name')
      .addGroupBy('shop.id')
      .addGroupBy('shop.name')
      .orderBy('scanCount', 'DESC')
      .limit(20);

    if (shopId) {
      query.where('shop.id = :shopId', { shopId });
    }

    return query.getRawMany();
  }

  // Najuspešnije prodavnice (na osnovu skeniranja / iskorišćenih poena)
  async getTopPerformingShops() {
    const transactionStats = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.shop', 'shop')
      .select('shop.id', 'shopId')
      .addSelect('shop.name', 'shopName')
      .addSelect('shop.location', 'location')
      .addSelect('COUNT(transaction.id)', 'totalTransactions')
      .addSelect('SUM(transaction.points)', 'totalPointsUsed')
      .groupBy('shop.id')
      .addGroupBy('shop.name')
      .addGroupBy('shop.location')
      .orderBy('totalTransactions', 'DESC')
      .getRawMany();

    return transactionStats;
  }

  // Trend aktivnosti korisnika (nedeljni / mesečni)
  async getUserActivityTrends(period: 'weekly' | 'monthly' = 'weekly') {
    const days = period === 'weekly' ? 7 : 30;
    const dateFrom = new Date();
    dateFrom.setDate(dateFrom.getDate() - days);

    const transactions = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('DATE(transaction.date)', 'date')
      .addSelect('COUNT(DISTINCT transaction.userId)', 'activeUsers')
      .addSelect('COUNT(transaction.id)', 'totalTransactions')
      .addSelect('SUM(transaction.points)', 'totalPoints')
      .where('transaction.date >= :dateFrom', { dateFrom })
      .groupBy('DATE(transaction.date)')
      .orderBy('date', 'ASC')
      .getRawMany();

    const approvalRequests = await this.approvalRequestsRepository
      .createQueryBuilder('request')
      .select('DATE(request.createdAt)', 'date')
      .addSelect('COUNT(request.id)', 'totalRequests')
      .where('request.createdAt >= :dateFrom', { dateFrom })
      .groupBy('DATE(request.createdAt)')
      .orderBy('date', 'ASC')
      .getRawMany();

    return {
      period,
      days,
      transactions,
      approvalRequests,
    };
  }

  // Učestalost novih proizvoda na proveri (approval requests)
  async getApprovalRequestFrequency() {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const [
      totalPending,
      totalApproved,
      totalRejected,
      last7DaysCount,
      last30DaysCount,
      byProduct,
    ] = await Promise.all([
      this.approvalRequestsRepository.count({
        where: { status: ApprovalStatus.PENDING },
      }),
      this.approvalRequestsRepository.count({
        where: { status: ApprovalStatus.APPROVED },
      }),
      this.approvalRequestsRepository.count({
        where: { status: ApprovalStatus.REJECTED },
      }),
      this.approvalRequestsRepository
        .createQueryBuilder('request')
        .where('request.createdAt >= :date', { date: last7Days })
        .getCount(),
      this.approvalRequestsRepository
        .createQueryBuilder('request')
        .where('request.createdAt >= :date', { date: last30Days })
        .getCount(),
      this.approvalRequestsRepository
        .createQueryBuilder('request')
        .leftJoin('request.product', 'product')
        .select('product.id', 'productId')
        .addSelect('product.name', 'productName')
        .addSelect('COUNT(request.id)', 'requestCount')
        .groupBy('product.id')
        .addGroupBy('product.name')
        .orderBy('requestCount', 'DESC')
        .limit(10)
        .getRawMany(),
    ]);

    return {
      summary: {
        totalPending,
        totalApproved,
        totalRejected,
        last7Days: last7DaysCount,
        last30Days: last30DaysCount,
      },
      mostRequestedProducts: byProduct,
    };
  }

  // Izveštaji po prodavnici
  async getShopReport(shopId: string) {
    const shop = await this.shopsRepository.findOne({
      where: { id: shopId },
    });

    if (!shop) {
      throw new Error('Shop not found');
    }

    // Koji se proizvodi najviše skeniraju
    const mostScannedProducts = await this.getMostScannedProductsByShop(shopId);

    // Korisnici koji se najčešće vraćaju
    const returningCustomers = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.user', 'user')
      .select('user.id', 'userId')
      .addSelect('user.name', 'userName')
      .addSelect('user.email', 'userEmail')
      .addSelect('COUNT(transaction.id)', 'visitCount')
      .addSelect('SUM(transaction.points)', 'totalPointsUsed')
      .where('transaction.shopId = :shopId', { shopId })
      .groupBy('user.id')
      .addGroupBy('user.name')
      .addGroupBy('user.email')
      .orderBy('visitCount', 'DESC')
      .limit(20)
      .getRawMany();

    // Statistika korišćenja poena
    const pointsUsageStats = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('DATE(transaction.date)', 'date')
      .addSelect('COUNT(transaction.id)', 'transactionCount')
      .addSelect('SUM(transaction.points)', 'totalPoints')
      .addSelect('AVG(transaction.points)', 'avgPoints')
      .where('transaction.shopId = :shopId', { shopId })
      .groupBy('DATE(transaction.date)')
      .orderBy('date', 'DESC')
      .limit(30)
      .getRawMany();

    const totalStats = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('COUNT(transaction.id)', 'totalTransactions')
      .addSelect('SUM(transaction.points)', 'totalPointsUsed')
      .addSelect('AVG(transaction.points)', 'avgPointsPerTransaction')
      .addSelect('COUNT(DISTINCT transaction.userId)', 'uniqueCustomers')
      .where('transaction.shopId = :shopId', { shopId })
      .getRawOne();

    return {
      shop: {
        id: shop.id,
        name: shop.name,
        location: shop.location,
      },
      mostScannedProducts,
      returningCustomers,
      pointsUsage: {
        overall: totalStats,
        daily: pointsUsageStats,
      },
    };
  }

  // Opšta statistika
  async getOverallStatistics() {
    const [totalUsers, totalShops, totalTransactions, totalApprovalRequests] =
      await Promise.all([
        this.usersRepository.count(),
        this.shopsRepository.count(),
        this.transactionsRepository.count(),
        this.approvalRequestsRepository.count(),
      ]);

    const totalPoints = await this.transactionsRepository
      .createQueryBuilder('transaction')
      .select('SUM(transaction.points)', 'total')
      .getRawOne();

    return {
      totalUsers,
      totalShops,
      totalTransactions,
      totalApprovalRequests,
      totalPointsUsed: totalPoints?.total || 0,
    };
  }
}
