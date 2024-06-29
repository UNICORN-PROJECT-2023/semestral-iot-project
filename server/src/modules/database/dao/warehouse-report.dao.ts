import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository, getConnection } from 'typeorm';
import { WarehouseLogsEntity } from '../entity/warehouse-logs.entity';
import { WarehouseEntity } from '../entity/warehouse.entity';
import { format } from 'date-fns';
import { WarehouseReportEntity } from '../entity/warehouse-report.entity';

@Injectable()
export class WarehouseReportDao {
  constructor(
    @InjectRepository(WarehouseReportEntity)
    private warehouseReportEntity: Repository<WarehouseReportEntity>,
    @InjectRepository(WarehouseEntity)
    private WarehouseRepository: Repository<WarehouseEntity>,
  ) {}

  async add(warehouseLogsEntity: WarehouseReportEntity, warehouseId: number): Promise<void> {
    const warehouse = await this.WarehouseRepository.findOneBy({ id: warehouseId });

    warehouseLogsEntity.warehouseEntity = warehouse;

    await this.warehouseReportEntity.save(warehouseLogsEntity);
  }

  async isReported(warehouseId: number, allertMinDuration: number): Promise<boolean> {
    const reportedInLastHour = await this.warehouseReportEntity
    .createQueryBuilder("report")
    .where("report.warehouseEntityId = :warehouseId", { warehouseId })
    .andWhere(`report.createdAt > NOW() - INTERVAL '${allertMinDuration} MINUTE'`)
    .getOne();
    return !!reportedInLastHour;
  }

  
}
