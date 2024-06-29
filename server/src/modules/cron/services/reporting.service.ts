import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';
import { log } from 'console';
import { WarehouseReportDao } from 'src/modules/database/dao/warehouse-report.dao';
import { WarehouseDao } from 'src/modules/database/dao/warehouse.dao';
import { WarehouseLogsDao } from 'src/modules/database/dao/warehouseLogs.dao';
import { WarehouseReportEntity } from 'src/modules/database/entity/warehouse-report.entity';


@Injectable()
export class ReportingService {
  private readonly logger = new Logger(ReportingService.name);

  constructor(
    @Inject(WarehouseDao)
    private warehouseDao: WarehouseDao,
    @Inject(WarehouseLogsDao)
    private warehouseLogsDao: WarehouseLogsDao,
    @Inject(WarehouseReportDao)
    private warehouseReportDao: WarehouseReportDao,
  ) {}


  @Cron(CronExpression.EVERY_MINUTE)
  async handleRatingCalculation() {
    this.logger.debug('Start warehouse report calculation');
    const warehouses = await this.warehouseDao.findAll();

    for (const warehouse of warehouses) {
      const logs = await this.warehouseLogsDao.findAllByWarehouseId(
        warehouse.id, 
        1000, 
        0, 
        new Date(Date.now() - 1000 * 60 * 60 * 24),
        new Date(), 
        1);

      const isReported = await this.warehouseReportDao.isReported(warehouse.id, warehouse.allertMinDuration);
    
      if (logs.length === 0) {
        continue;
      }

      const averageTemperature = logs.reduce((acc, log) => acc + log.temperature, 0) / logs.length;
      const isTemperatureNormal = averageTemperature < warehouse.temperatureMax && averageTemperature > warehouse.temperatureMin;

      this.logger.debug(`Warehouse ${warehouse.id} average temperature is ${averageTemperature}, is temperature normal: ${isTemperatureNormal} is reported: ${isReported}`);
      if (isReported || isTemperatureNormal) {
        continue;
      }

      const warehouseReportEntity: WarehouseReportEntity = new WarehouseReportEntity(
        averageTemperature,
        warehouse,
      );

      await this.warehouseReportDao.add(warehouseReportEntity, warehouse.id);
      await this.sendReport(warehouse.id);
    }

    this.logger.debug('Finish warehouse report calculation');
  }

  async sendReport(warehouseId: number) {
    this.logger.log("---------------------------------------------");
    this.logger.log("Sending report for warehouse: " + warehouseId);
    this.logger.log("---------------------------------------------");
  }


}