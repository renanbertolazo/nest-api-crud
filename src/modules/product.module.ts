import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { productProviders } from '../providers/product.providers';
import { ProductsService } from '../services/product.service';
import { ProductController } from 'src/controllers/product.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ProductController],
  imports: [DatabaseModule, HttpModule],
  providers: [
    ...productProviders,
    ProductsService,
  ],
})
export class ProductModule {}