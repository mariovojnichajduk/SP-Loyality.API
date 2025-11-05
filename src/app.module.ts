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

                    const totalPointsResult = await Transaction.createQueryBuilder(
                      'transaction',
                    )
                      .select('SUM(transaction.points)', 'total')
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
                    ]);

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
                      approvalStats: {
                        summary: {
                          unapprovedProducts,
                          totalApproved,
                          last7Days: last7DaysCount,
                          last30Days: last30DaysCount,
                        },
                        mostRequestedProducts,
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
                      approvalStats: {
                        summary: {
                          unapprovedProducts: 0,
                          totalApproved: 0,
                          last7Days: 0,
                          last30Days: 0,
                        },
                        mostRequestedProducts: [],
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
                    navigation: { name: 'Shop Management', icon: 'Store' },
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

                            // Update product with point value and shop
                            product.pointValue = pointValue;
                            product.isApproved = true;
                            product.status = ProductStatus.AVAILABLE;
                            if (shopId) {
                              product.shopId = shopId;
                            }
                            await product.save();

                            // Find and reward all users who requested this product
                            const approvalRequests = await ProductApprovalRequest.find({
                              where: { productId, isRewarded: false },
                              relations: ['user'],
                            });

                            for (const req of approvalRequests) {
                              if (req.user) {
                                req.user.points = (req.user.points || 0) + product.pointValue;
                                await req.user.save();
                                req.isRewarded = true;
                                await req.save();
                              }
                            }

                            return {
                              record: record.toJSON(currentAdmin),
                              notice: {
                                message: `Product approved! ${product.pointValue} points set. ${approvalRequests.length} user(s) rewarded.`,
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
                            await Product.delete(productId);
                            await ProductApprovalRequest.delete({ productId });

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
                    navigation: { name: 'Transactions', icon: 'Receipt' },
                  },
                },
              ],
              branding: {
                companyName: 'SP Loyalty Admin',
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
