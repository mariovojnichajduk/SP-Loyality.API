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
import { ApprovalRequestsModule } from './approval-requests/approval-requests.module';
import { PointsModule } from './points/points.module';
import { User, UserRole } from './users/user.entity';
import { Shop } from './shops/shop.entity';
import { Product } from './products/product.entity';
import { Transaction } from './transactions/transaction.entity';
import { ApprovalRequest, ApprovalStatus } from './approval-requests/approval-request.entity';

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

          AdminJS.registerAdapter({
            Resource: AdminJSTypeorm.Resource,
            Database: AdminJSTypeorm.Database,
          });

          return {
            adminJsOptions: {
              rootPath: '/admin',
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
                    navigation: { name: 'Shop Management', icon: 'Store' },
                  },
                },
                {
                  resource: Transaction,
                  options: {
                    navigation: { name: 'Transactions', icon: 'Receipt' },
                  },
                },
                {
                  resource: ApprovalRequest,
                  options: {
                    navigation: { name: 'Approval Requests', icon: 'CheckSquare' },
                    listProperties: ['id', 'user', 'product', 'status', 'createdAt'],
                    filterProperties: [],
                    sort: {
                      sortBy: 'createdAt',
                      direction: 'desc',
                    },
                    actions: {
                      edit: { isVisible: false },
                      delete: { isVisible: false },
                      bulkDelete: { isVisible: false },
                      new: { isVisible: false },
                      search: { isVisible: false },
                      list: {
                        before: async (request) => {
                          if (!request.query?.filters?.status) {
                            request.query = {
                              ...request.query,
                              filters: {
                                ...request.query?.filters,
                                status: ApprovalStatus.PENDING,
                              },
                            };
                          }
                          return request;
                        },
                      },
                      approve: {
                        actionType: 'record',
                        component: false,
                        isVisible: (context) => {
                          return context.record.params.status === ApprovalStatus.PENDING;
                        },
                        handler: async (request, response, context) => {
                          const { record, currentAdmin } = context;
                          const approvalRequest = await ApprovalRequest.findOne({
                            where: { id: record.id() },
                            relations: ['user', 'product'],
                          });

                          if (!approvalRequest) {
                            return {
                              record: record.toJSON(currentAdmin),
                              notice: {
                                message: 'Approval request not found',
                                type: 'error',
                              },
                            };
                          }

                          if (approvalRequest.status !== ApprovalStatus.PENDING) {
                            return {
                              record: record.toJSON(currentAdmin),
                              notice: {
                                message: 'Only pending requests can be approved',
                                type: 'error',
                              },
                            };
                          }

                          // Update status to approved
                          approvalRequest.status = ApprovalStatus.APPROVED;
                          await approvalRequest.save();

                          // Award points to user
                          if (approvalRequest.user && approvalRequest.product) {
                            approvalRequest.user.points += approvalRequest.product.pointValue;
                            await approvalRequest.user.save();
                          }

                          return {
                            record: record.toJSON(currentAdmin),
                            notice: {
                              message: `Request approved! ${approvalRequest.product.pointValue} points awarded to ${approvalRequest.user.name}`,
                              type: 'success',
                            },
                            redirectUrl: '/admin/resources/ApprovalRequest',
                          };
                        },
                        guard: 'Are you sure you want to approve this request?',
                        icon: 'CheckCircle',
                      },
                      reject: {
                        actionType: 'record',
                        component: false,
                        isVisible: (context) => {
                          return context.record.params.status === ApprovalStatus.PENDING;
                        },
                        handler: async (request, response, context) => {
                          const { record, currentAdmin } = context;
                          const approvalRequest = await ApprovalRequest.findOne({
                            where: { id: record.id() },
                          });

                          if (!approvalRequest) {
                            return {
                              record: record.toJSON(currentAdmin),
                              notice: {
                                message: 'Approval request not found',
                                type: 'error',
                              },
                            };
                          }

                          if (approvalRequest.status !== ApprovalStatus.PENDING) {
                            return {
                              record: record.toJSON(currentAdmin),
                              notice: {
                                message: 'Only pending requests can be rejected',
                                type: 'error',
                              },
                            };
                          }

                          // Update status to rejected
                          approvalRequest.status = ApprovalStatus.REJECTED;
                          await approvalRequest.save();

                          return {
                            record: record.toJSON(currentAdmin),
                            notice: {
                              message: 'Request rejected',
                              type: 'success',
                            },
                            redirectUrl: '/admin/resources/ApprovalRequest',
                          };
                        },
                        guard: 'Are you sure you want to reject this request?',
                        icon: 'XCircle',
                      },
                    },
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
    ApprovalRequestsModule,
    PointsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
