import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
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

  async findAllByWarehouseId(warehouseId: number, length: number, offset: number): Promise<WarehouseLogsEntity[]> {
    return this.warehouseLogsRepository.find({
      where: {
        warehouseEntity: {
          id: warehouseId,
        },
      },
      order: {
        date: 'DESC',
      },
      take: length,
      skip: offset,
    });
  }
}
