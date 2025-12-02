import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShopsModule } from './shops/shops.module';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PointsModule } from './points/points.module';
import { User, UserRole } from './users/user.entity';
import { Shop } from './shops/shop.entity';
import { Product, ProductStatus } from './products/product.entity';
import { Transaction } from './transactions/transaction.entity';
import { ProductApprovalRequest } from './products/product-approval-request.entity';
import { StatisticsModule } from './statistics/statistics.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { RewardsModule } from './rewards/rewards.module';
import { FamilyModule } from './family/family.module';
import { Reward } from './rewards/reward.entity';
import { Redemption } from './rewards/redemption.entity';

// Admin authentication using database users
const authenticate = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.role !== UserRole.ADMIN) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return { email: user.email, name: user.name };
    }

    return null;
  } catch (error) {
    console.error('Admin authentication error:', error);
    return null;
  }
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Set to false in production
      }),
    }),
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: async () => {
          const AdminJS = (await import('adminjs')).default;
          const AdminJSTypeorm = await import('@adminjs/typeorm');
          const { ComponentLoader } = await import('adminjs');

          AdminJS.registerAdapter({
            Resource: AdminJSTypeorm.Resource,
            Database: AdminJSTypeorm.Database,
          });

          const componentLoader = new ComponentLoader();
          const path = await import('path');
          const Dashboard = componentLoader.add(
            'Dashboard',
            path.join(__dirname, './admin/dashboard'),
          );
          const ApproveProduct = componentLoader.add(
            'ApproveProduct',
            path.join(__dirname, './admin/approve-product'),
          );

          return {
            adminJsOptions: {
              rootPath: '/admin',
              dashboard: {
                component: Dashboard,
                handler: async (request, response, context) => {
                  console.log('Dashboard handler called');
                  try {
                    // Fetch all statistics using entity repositories
                    const [
                      totalUsers,
                      totalShops,
                      totalTransactions,
                      totalApprovalRequests,
                      unapprovedProducts,
                    ] = await Promise.all([
                      User.count(),
                      Shop.count(),
                      Transaction.count(),
                      ProductApprovalRequest.count(),
                      Product.count({ where: { isApproved: false } }),
                    ]);

                    const totalPointsResult = await Redemption.createQueryBuilder(
                      'redemption',
                    )
                      .select('SUM(redemption.pointsSpent)', 'total')
                      .getRawOne();

                    // Get top performing shops
                    const topShops = await Transaction.createQueryBuilder('transaction')
                      .leftJoin('transaction.shop', 'shop')
                      .select('shop.id', 'shopId')
                      .addSelect('shop.name', 'shopName')
                      .addSelect('shop.location', 'location')
                      .addSelect('COUNT(transaction.id)', 'totalTransactions')
                      .addSelect('SUM(transaction.points)', 'totalPointsUsed')
                      .groupBy('shop.id')
                      .addGroupBy('shop.name')
                      .addGroupBy('shop.location')
                      .orderBy('COUNT(transaction.id)', 'DESC')
                      .limit(5)
                      .getRawMany();

                    // Get product approval statistics
                    const last7Days = new Date();
                    last7Days.setDate(last7Days.getDate() - 7);
                    const last30Days = new Date();
                    last30Days.setDate(last30Days.getDate() - 30);

                    const [
                      totalApproved,
                      last7DaysCount,
                      last30DaysCount,
                      mostRequestedProducts,
                      mostRedeemedRewards,
                    ] = await Promise.all([
                      Product.count({ where: { isApproved: true } }),
                      ProductApprovalRequest.createQueryBuilder('request')
                        .where('request.createdAt >= :date', { date: last7Days })
                        .getCount(),
                      ProductApprovalRequest.createQueryBuilder('request')
                        .where('request.createdAt >= :date', { date: last30Days })
                        .getCount(),
                      ProductApprovalRequest.createQueryBuilder('request')
                        .leftJoin('request.product', 'product')
                        .select('product.id', 'productId')
                        .addSelect('product.name', 'productName')
                        .addSelect('COUNT(request.id)', 'requestCount')
                        .groupBy('product.id')
                        .addGroupBy('product.name')
                        .orderBy('COUNT(request.id)', 'DESC')
                        .limit(10)
                        .getRawMany(),
                      Redemption.createQueryBuilder('redemption')
                        .leftJoin('redemption.reward', 'reward')
                        .select('reward.id', 'rewardId')
                        .addSelect('reward.name', 'rewardName')
                        .addSelect('COUNT(redemption.id)', 'redemptionCount')
                        .addSelect('SUM(redemption.pointsSpent)', 'totalPointsSpent')
                        .groupBy('reward.id')
                        .addGroupBy('reward.name')
                        .orderBy('COUNT(redemption.id)', 'DESC')
                        .limit(10)
                        .getRawMany(),
                    ]);

                    // Get daily stats for the last 14 days for chart (simplified for performance)
                    const dailyStats: Array<{ date: string; approved: number; pending: number }> = [];
                    const now = new Date();
                    for (let i = 13; i >= 0; i--) {
                      const date = new Date(now);
                      date.setDate(date.getDate() - i);
                      date.setHours(0, 0, 0, 0);

                      const formattedDate = date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      });

                      dailyStats.push({
                        date: formattedDate,
                        approved: 0,
                        pending: 0,
                      });
                    }
                    console.log('Created dailyStats:', dailyStats.map(d => d.date));

                    // Get aggregated data from last 14 days
                    const fourteenDaysAgo = new Date();
                    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

                    const approvedByDay = await Product.createQueryBuilder('product')
                      .select("DATE(product.createdAt)", 'date')
                      .addSelect('COUNT(*)', 'count')
                      .where('product.isApproved = true AND product.createdAt >= :date', {
                        date: fourteenDaysAgo,
                      })
                      .groupBy('DATE(product.createdAt)')
                      .getRawMany();

                    const pendingByDay = await ProductApprovalRequest.createQueryBuilder('request')
                      .select("DATE(request.createdAt)", 'date')
                      .addSelect('COUNT(*)', 'count')
                      .where('request.createdAt >= :date', { date: fourteenDaysAgo })
                      .groupBy('DATE(request.createdAt)')
                      .getRawMany();

                    console.log('Approved by day:', approvedByDay);
                    console.log('Pending by day:', pendingByDay);

                    // Map the data to dailyStats
                    approvedByDay.forEach((row: any) => {
                      // Parse the date string and convert to local date
                      const dateStr = typeof row.date === 'string' ? row.date : row.date.toISOString();
                      const dateObj = new Date(dateStr);
                      const formattedDate = dateObj.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      });
                      console.log(`Looking for approved date: ${formattedDate} from ${dateStr}`);
                      const stat = dailyStats.find((s) => s.date === formattedDate);
                      if (stat) {
                        stat.approved = parseInt(row.count);
                        console.log(`Found match! Set approved to ${row.count}`);
                      } else {
                        console.log(`No match found in dailyStats for ${formattedDate}`);
                      }
                    });

                    pendingByDay.forEach((row: any) => {
                      const dateStr = typeof row.date === 'string' ? row.date : row.date.toISOString();
                      const dateObj = new Date(dateStr);
                      const formattedDate = dateObj.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      });
                      console.log(`Looking for pending date: ${formattedDate} from ${dateStr}`);
                      const stat = dailyStats.find((s) => s.date === formattedDate);
                      if (stat) {
                        stat.pending = parseInt(row.count);
                        console.log(`Found match! Set pending to ${row.count}`);
                      } else {
                        console.log(`No match found in dailyStats for ${formattedDate}`);
                      }
                    });

                    const result = {
                      overview: {
                        totalUsers,
                        totalShops,
                        totalTransactions,
                        totalApprovalRequests,
                        unapprovedProducts,
                        totalPointsUsed: totalPointsResult?.total || 0,
                      },
                      topShops,
                      mostRedeemedRewards,
                      approvalStats: {
                        summary: {
                          totalPending: unapprovedProducts,
                          totalApproved,
                          last7Days: last7DaysCount,
                          last30Days: last30DaysCount,
                        },
                        mostRequestedProducts,
                        dailyStats,
                      },
                    };
                    console.log('Dashboard handler returning data:', result);
                    return result;
                  } catch (error) {
                    console.error('Dashboard handler error:', error);
                    return {
                      overview: {
                        totalUsers: 0,
                        totalShops: 0,
                        totalTransactions: 0,
                        totalApprovalRequests: 0,
                        unapprovedProducts: 0,
                        totalPointsUsed: 0,
                      },
                      topShops: [],
                      mostRedeemedRewards: [],
                      approvalStats: {
                        summary: {
                          totalPending: 0,
                          totalApproved: 0,
                          last7Days: 0,
                          last30Days: 0,
                        },
                        mostRequestedProducts: [],
                        dailyStats: [],
                      },
                    };
                  }
                },
              },
              componentLoader,
              resources: [
                {
                  resource: User,
                  options: {
                    navigation: { name: 'User Management', icon: 'User' },
                    properties: {
                      password: { isVisible: false },
                      verificationCode: { isVisible: false },
                      passwordResetCode: { isVisible: false },
                    },
                  },
                },
                {
                  resource: Shop,
                  options: {
                    navigation: { name: 'Shop Management', icon: 'Home' },
                  },
                },
                {
                  resource: Product,
                  options: {
                    id: 'Approving',
                    navigation: { name: 'Products', icon: 'ShoppingCart' },
                    listProperties: ['name', 'shopId', 'isApproved', 'pointValue', 'createdAt'],
                    properties: {
                      shopId: {
                        isVisible: { list: true, show: true, edit: false, filter: false },
                      },
                      isApproved: {
                        isVisible: { list: true, show: true, edit: false, filter: true },
                      },
                      pointValue: {
                        isVisible: { list: true, show: true, edit: false, filter: false },
                      },
                    },
                    sort: {
                      sortBy: 'createdAt',
                      direction: 'desc',
                    },
                    actions: {
                      edit: {
                        isVisible: (context) => {
                          return context.record.params.isApproved === false;
                        },
                      },
                      delete: { isVisible: false },
                      bulkDelete: { isVisible: false },
                      new: { isVisible: false },
                      list: {
                        before: async (request) => {
                          if (!request.query?.filters?.isApproved) {
                            request.query = {
                              ...request.query,
                              filters: {
                                ...request.query?.filters,
                                isApproved: 'false',
                              },
                            };
                          }
                          return request;
                        },
                      },
                      approve: {
                        actionType: 'record',
                        component: ApproveProduct,
                        isVisible: (context) => {
                          return context.record.params.isApproved === false;
                        },
                        handler: async (request, response, context) => {
                          const { record, currentAdmin } = context;
                          const productId = record.id();

                          // Get data from request payload
                          const pointValue = parseInt(request.payload?.pointValue);
                          const shopId = request.payload?.shopId || null;

                          if (!pointValue || pointValue <= 0) {
                            return {
                              record: record.toJSON(currentAdmin),
                              notice: {
                                message: 'Please provide a valid point value',
                                type: 'error',
                              },
                            };
                          }

                          try {
                            const product = await Product.findOne({ where: { id: productId } });
                            if (!product) {
                              return {
                                record: record.toJSON(currentAdmin),
                                notice: {
                                  message: 'Product not found',
                                  type: 'error',
                                },
                              };
                            }

                            // Update product manually
                            product.pointValue = pointValue;
                            product.isApproved = true;
                            product.status = ProductStatus.AVAILABLE;
                            if (shopId) {
                              product.shopId = shopId;
                            }
                            await product.save();

                            // Mark old approval requests as rewarded (for tracking purposes only)
                            // Note: Points are now awarded through the TransactionProduct system
                            const approvalRequests = await ProductApprovalRequest.find({
                              where: { productId, isRewarded: false },
                            });

                            for (const req of approvalRequests) {
                              req.isRewarded = true;
                              await req.save();
                            }

                            // Award pending points from receipts using entity manager
                            // Get entity manager from Product repository
                            const entityManager = Product.getRepository().manager;

                            // Find unpaid transaction products with their transactions
                            const unpaidTPs = await entityManager.query(
                              `SELECT tp.*, t."userId", t.id as transaction_id
                               FROM transaction_products tp
                               JOIN transactions t ON tp."transactionId" = t.id
                               WHERE tp."productId" = $1 AND tp."pointsAwarded" = false`,
                              [productId]
                            );

                            let pendingPointsAwarded = 0;
                            const uniqueUsers = new Set<string>();

                            for (const tp of unpaidTPs) {
                              const pointsToAward = product.pointValue * tp.quantity;

                              // Update transaction points
                              await entityManager.query(
                                `UPDATE transactions SET points = points + $1 WHERE id = $2`,
                                [pointsToAward, tp.transaction_id]
                              );

                              // Award points to user
                              await entityManager.query(
                                `UPDATE users SET points = points + $1 WHERE id = $2`,
                                [pointsToAward, tp.userId]
                              );

                              // Mark as awarded and update points value
                              await entityManager.query(
                                `UPDATE transaction_products
                                 SET "pointsAwarded" = true, "pointsValue" = $1
                                 WHERE "transactionId" = $2 AND "productId" = $3`,
                                [pointsToAward, tp.transactionId, productId]
                              );

                              pendingPointsAwarded += pointsToAward;
                              uniqueUsers.add(tp.userId);
                            }

                            return {
                              record: record.toJSON(currentAdmin),
                              notice: {
                                message: `Product approved! ${product.pointValue} points set. ${approvalRequests.length + uniqueUsers.size} user(s) rewarded${pendingPointsAwarded > 0 ? ` (including ${pendingPointsAwarded} pending points from ${unpaidTPs.length} receipts)` : ''}.`,
                                type: 'success',
                              },
                              redirectUrl: '/admin/resources/Approving',
                            };
                          } catch (error) {
                            console.error('Product approval error:', error);
                            return {
                              record: record.toJSON(currentAdmin),
                              notice: {
                                message: `Error: ${error.message}`,
                                type: 'error',
                              },
                            };
                          }
                        },
                        icon: 'CheckCircle',
                      },
                      reject: {
                        actionType: 'record',
                        component: false,
                        isVisible: (context) => {
                          return context.record.params.isApproved === false;
                        },
                        handler: async (request, response, context) => {
                          const { record, currentAdmin } = context;
                          const productId = record.id();

                          try {
                            // Delete approval requests first to avoid foreign key constraint violation
                            await ProductApprovalRequest.delete({ productId });
                            await Product.delete(productId);

                            return {
                              record: record.toJSON(currentAdmin),
                              notice: {
                                message: 'Product rejected and removed',
                                type: 'success',
                              },
                              redirectUrl: '/admin/resources/Approving',
                            };
                          } catch (error) {
                            return {
                              record: record.toJSON(currentAdmin),
                              notice: {
                                message: `Error: ${error.message}`,
                                type: 'error',
                              },
                            };
                          }
                        },
                        guard: 'Are you sure you want to reject and delete this product?',
                        icon: 'XCircle',
                      },
                    },
                  },
                },
                {
                  resource: Product,
                  options: {
                    id: 'Product Management',
                    navigation: { name: 'Products', icon: 'ShoppingCart' },
                    listProperties: ['name', 'shopId', 'isApproved', 'pointValue', 'status', 'createdAt'],
                    properties: {
                      shopId: {
                        isVisible: { list: true, show: true, edit: true, filter: true },
                      },
                      isApproved: {
                        isVisible: { list: true, show: true, edit: false, filter: true },
                      },
                      pointValue: {
                        isVisible: { list: true, show: true, edit: true, filter: false },
                      },
                      status: {
                        isVisible: { list: true, show: true, edit: true, filter: true },
                      },
                    },
                    sort: {
                      sortBy: 'createdAt',
                      direction: 'desc',
                    },
                    actions: {
                      new: { isVisible: false },
                      edit: { isVisible: true },
                      delete: { isVisible: true },
                      bulkDelete: { isVisible: true },
                    },
                  },
                },
                {
                  resource: Transaction,
                  options: {
                    navigation: { name: 'Transactions', icon: 'CreditCard' },
                  },
                },
                {
                  resource: Reward,
                  options: {
                    navigation: { name: 'Rewards & Redemptions', icon: 'Gift' },
                    listProperties: ['name', 'pointsCost', 'stock', 'status', 'createdAt'],
                    properties: {
                      name: {
                        isVisible: { list: true, show: true, edit: true, filter: true },
                      },
                      description: {
                        isVisible: { list: false, show: true, edit: true, filter: false },
                        type: 'textarea',
                      },
                      pointsCost: {
                        isVisible: { list: true, show: true, edit: true, filter: false },
                      },
                      stock: {
                        isVisible: { list: true, show: true, edit: true, filter: false },
                      },
                      imageUrl: {
                        isVisible: { list: false, show: true, edit: true, filter: false },
                      },
                      status: {
                        isVisible: { list: true, show: true, edit: true, filter: true },
                      },
                    },
                    sort: {
                      sortBy: 'createdAt',
                      direction: 'desc',
                    },
                    actions: {
                      new: { isVisible: true },
                      edit: { isVisible: true },
                      delete: { isVisible: true },
                      bulkDelete: { isVisible: true },
                    },
                  },
                },
                {
                  resource: Redemption,
                  options: {
                    navigation: { name: 'Rewards & Redemptions', icon: 'Gift' },
                    listProperties: ['id', 'userId', 'rewardId', 'pointsSpent', 'status', 'createdAt'],
                    properties: {
                      userId: {
                        isVisible: { list: true, show: true, edit: false, filter: true },
                      },
                      rewardId: {
                        isVisible: { list: true, show: true, edit: false, filter: true },
                      },
                      pointsSpent: {
                        isVisible: { list: true, show: true, edit: false, filter: false },
                      },
                      status: {
                        isVisible: { list: true, show: true, edit: true, filter: true },
                        availableValues: [
                          { value: 'pending', label: 'Pending' },
                          { value: 'completed', label: 'Completed' },
                          { value: 'cancelled', label: 'Cancelled' },
                        ],
                      },
                    },
                    sort: {
                      sortBy: 'createdAt',
                      direction: 'desc',
                    },
                    actions: {
                      new: { isVisible: false },
                      edit: {
                        isVisible: true,
                        after: async (response, request, context) => {
                          // After editing redemption status, handle refund if cancelled
                          const { record, currentAdmin } = context;
                          const newStatus = request.payload?.status;
                          const redemptionId = record.id();

                          if (newStatus === 'cancelled') {
                            const entityManager = Redemption.getRepository().manager;

                            // Get redemption details
                            const redemption = await entityManager.findOne(Redemption, {
                              where: { id: redemptionId },
                            });

                            if (redemption) {
                              // Refund points to user
                              await entityManager.query(
                                `UPDATE users SET points = points + $1 WHERE id = $2`,
                                [redemption.pointsSpent, redemption.userId]
                              );

                              // Restore stock
                              const reward = await entityManager.findOne(Reward, {
                                where: { id: redemption.rewardId },
                              });

                              if (reward && reward.stock !== null) {
                                await entityManager.query(
                                  `UPDATE rewards SET stock = stock + 1, status = 'active' WHERE id = $1`,
                                  [redemption.rewardId]
                                );
                              }
                            }
                          }

                          return response;
                        },
                      },
                      delete: { isVisible: false },
                      bulkDelete: { isVisible: false },
                    },
                  },
                },
              ],
              branding: {
                companyName: 'Loyality Program Admin',
                logo: false,
                softwareBrothers: false,
              },
            },
            auth: {
              authenticate,
              cookieName: 'adminjs',
              cookiePassword: 'secret-change-this-in-production',
            },
            sessionOptions: {
              resave: true,
              saveUninitialized: true,
              secret: 'secret-change-this-in-production',
            },
          };
        },
      }),
    ),
    UsersModule,
    AuthModule,
    ShopsModule,
    ProductsModule,
    TransactionsModule,
    PointsModule,
    StatisticsModule,
    ReceiptsModule,
    RewardsModule,
    FamilyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
