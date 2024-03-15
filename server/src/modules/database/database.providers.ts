import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerArticleEntity } from './entity/customer-article.entity';
import { CustomerEntity } from './entity/customer.entity';
import { ArticleEntity } from './entity/article.entity';
import { CategoryEntity } from './entity/category.entity';
import { CategoryArticleEntity } from './entity/category-article.entity';

// List of entities
const entities = [CustomerEntity, ArticleEntity, CustomerArticleEntity, CategoryEntity, CategoryArticleEntity]

export const Provider = [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,  
    username: process.env.POSTGRES_USER || 'Admin',
    password: process.env.POSTGRES_PASSWORD || '1234',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    entities: entities,
    synchronize: true,
  }),
  TypeOrmModule.forFeature(entities)
];
