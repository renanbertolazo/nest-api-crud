import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';
import { DatabaseModule } from './database.module';
import { ProductModule } from './product.module';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { APP_FILTER, APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/common/providers/filters';
import { ValidationPipe } from 'src/common/providers/pipes/validation.pipe';
import { TransformInterceptor } from 'src/common/providers/interceptors';

@Module({
  imports: [DatabaseModule, ProductModule /* TypeOrmModule.forRoot() */],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('products');
  }
}
