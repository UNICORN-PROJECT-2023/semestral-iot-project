import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerWarehouseEntity } from './entity/customer-warehouse.entity';
import { CustomerEntity } from './entity/customer.entity';
import { WarehouseEntity } from './entity/warehouse.entity';
import { WarehouseLogsEntity } from './entity/warehouse-logs.entity';

// List of entities
const entities = [CustomerEntity, CustomerWarehouseEntity, WarehouseEntity, WarehouseLogsEntity];

export const Provider = [
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,  
    username: process.env.POSTGRES_USER || 'admin',
    password: process.env.POSTGRES_PASSWORD || '1234',
    database: process.env.POSTGRES_DATABASE || 'postgres',
    entities: entities,
    synchronize: true,
  }),
  TypeOrmModule.forFeature(entities)
];
