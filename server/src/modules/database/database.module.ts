import { Module } from '@nestjs/common';
import { Provider } from './database.providers';
import { CustomerDao } from './dao/customer.dao';
import { WarehouseDao } from './dao/warehouse.dao'; 
import { CustomerWarehouseDao } from './dao/customer-warehouse.dao'; 
import { WarehouseLogsDao } from './dao/warehouseLogs.dao';
import { WarehouseReportDao } from './dao/warehouse-report.dao';

@Module({
  imports: [
    ...Provider,
  ],
  providers: [
    CustomerDao,
    WarehouseDao,
    CustomerWarehouseDao,
    WarehouseLogsDao,
    WarehouseReportDao,
  ],
  exports: [
    CustomerDao,
    WarehouseDao,
    CustomerWarehouseDao,
    WarehouseLogsDao,
    WarehouseReportDao,
  ],
})
export class DatabaseModule {}
