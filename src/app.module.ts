import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ShopsModule } from './shops/shops.module';
import { ProductsModule } from './products/products.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ApprovalRequestsModule } from './approval-requests/approval-requests.module';
import { PointsModule } from './points/points.module';
import { User } from './users/user.entity';
import { Shop } from './shops/shop.entity';
import { Product } from './products/product.entity';
import { Transaction } from './transactions/transaction.entity';
import { ApprovalRequest } from './approval-requests/approval-request.entity';

// Admin authentication (change these credentials!)
const DEFAULT_ADMIN = {
  email: 'admin@test.com',
  password: 'admin123',
};

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
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
    ApprovalRequestsModule,
    PointsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
