import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository, getConnection } from 'typeorm';
import { WarehouseLogsEntity } from '../entity/warehouse-logs.entity';
import { WarehouseEntity } from '../entity/warehouse.entity';
import { format } from 'date-fns';

@Injectable()
export class WarehouseLogsDao {
  constructor(
    @InjectRepository(WarehouseLogsEntity)
    private warehouseLogsRepository: Repository<WarehouseLogsEntity>,
    @InjectRepository(WarehouseEntity)
    private WarehouseRepository: Repository<WarehouseEntity>,
  ) {}

  async add(warehouseLogsEntity: WarehouseLogsEntity): Promise<void> {
    const formattedDate = format(warehouseLogsEntity.date, "yyyy-MM-dd HH:mm:ss");

    const tempCategoryArticleEntity = await this.warehouseLogsRepository
    .createQueryBuilder("log")
    .where("log.warehouseEntityId = :warehouseId", { warehouseId: warehouseLogsEntity.warehouseEntity.id })
    .andWhere("to_char(log.date, 'YYYY-MM-DD HH24:MI:SS') = :date", { date: formattedDate })
    .getOne();

    if (tempCategoryArticleEntity) {
      throw new ConflictException('Warehouse already have action on this warehouse with same date');
    }

    const articleEntity = await this.WarehouseRepository.findOneBy({ id: warehouseLogsEntity.warehouseEntity.id });

    if (!articleEntity) {
      throw new BadRequestException('Warehouse by id does not exist');
    }

    await this.warehouseLogsRepository.save(warehouseLogsEntity);
  }

  async remove(warehouseLogsId: number): Promise<void> {
    const tempCategoryArticleEntity: WarehouseLogsEntity = await this.warehouseLogsRepository.findOne({
      where: {
        id: warehouseLogsId,
      },
    });

    if (!tempCategoryArticleEntity) {
      return;
    }

    await this.warehouseLogsRepository.delete(tempCategoryArticleEntity.id);
  }

  async findAllByWarehouseId(warehouseId: number, length: number, offset: number, from: Date, to: Date, interval: number): Promise<WarehouseLogsEntity[]> {
    const result = await this.warehouseLogsRepository.query(
      `SELECT 
         to_timestamp(floor(extract('epoch' from wl_measurement_date) / $6) * $6) AT TIME ZONE 'UTC' AS interval,
         AVG(wl_temperature) as averageTemperature
       FROM warehouse_logs
       WHERE "warehouseEntityId" = $1 AND wl_measurement_date BETWEEN $2 AND $3
       GROUP BY interval
       ORDER BY interval DESC
       LIMIT $4 OFFSET $5
       `,
      [warehouseId, from.toISOString(), to.toISOString(), length, offset, interval]
    );

    console.log(from.toISOString());
    console.log(to.toISOString());
    console.log(length);
    console.log(offset);

    return result.map(row => 
      new WarehouseLogsEntity(
        new Date(row.interval),
        Number(parseFloat(row.averagetemperature).toFixed(2)),
        null
      )
    );
  }
}
