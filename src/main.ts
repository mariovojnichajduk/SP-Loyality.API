import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  // HTTPS Configuration
  const httpsOptions = {
    pfx: fs.readFileSync(path.join(__dirname, '..', 'certs', 'cert.pfx')),
    passphrase: 'dev-password',
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors();

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('SP-Loyalty API')
    .setDescription('API for the SP-Loyalty application - User authentication, points, and favorite shops management')
    .setVersion('1.0')
    .addTag('auth', 'Authentication endpoints')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.APP_PORT || 3000;
  await app.listen(port, '0.0.0.0'); // Listen on all network interfaces
  console.log(`Application is running on: https://localhost:${port}`);
  console.log(`Application is running on network: https://10.136.106.200:${port}`);
  console.log(`Swagger documentation available at: https://localhost:${port}/api`);
}
bootstrap();
