import { Module } from '@nestjs/common';
import { Provider } from './database.providers';
import { CustomerDao } from './dao/customer.dao';
import { WarehouseDao } from './dao/warehouse.dao'; 
import { CustomerWarehouseDao } from './dao/customer-warehouse.dao'; 
import { WarehouseLogsDao } from './dao/warehouseLogs.dao';

@Module({
  imports: [
    ...Provider,
  ],
  providers: [
    CustomerDao,
    WarehouseDao,
    CustomerWarehouseDao,
    WarehouseLogsDao,
  ],
  exports: [
    CustomerDao,
    WarehouseDao,
    CustomerWarehouseDao,
    WarehouseLogsDao,
  ],
})
export class DatabaseModule {}
