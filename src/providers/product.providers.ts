import { Connection, DataSource } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (connection: DataSource) => connection.getRepository(ProductEntity),
    inject: ['DATABASE_CONNECTION'],
  },
];