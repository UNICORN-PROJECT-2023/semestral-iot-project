import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerWarehouseEntity } from '../entity/customer-warehouse.entity';
import { CustomerEntity } from '../entity/customer.entity';
import { WarehouseEntity } from '../entity/warehouse.entity';
import { ArticleType } from '../types/article-type.type';

@Injectable()
export class WarehouseDao {
  
  constructor(
    @InjectRepository(CustomerEntity)
    private usersRepository: Repository<CustomerEntity>,
    @InjectRepository(WarehouseEntity)
    private warehouseRepository: Repository<WarehouseEntity>,
    @InjectRepository(CustomerWarehouseEntity)
    private customerWarehouseEntity: Repository<CustomerWarehouseEntity>,
  ) {}


  async findAllByCustomerId(cstId: number): Promise<WarehouseEntity[]> {
    return await this.warehouseRepository.find({
      relations: [
        "customerWarehouseEntity",  
        "customerWarehouseEntity.customerEntity"
      ],
      where : {
        customerWarehouseEntity: {
          customerEntity: {
            id: cstId
          }
        }
      }
    });
  }

  async findAll(): Promise<WarehouseEntity[]> {
    return await this.warehouseRepository.find({
      relations: [
        "customerWarehouseEntity",  
        "customerWarehouseEntity.customerEntity"
      ]
    });
  }


  async findById(id: number): Promise<WarehouseEntity> {
    const tempArticleEntity = await this.warehouseRepository.find({
      relations: [
        "customerWarehouseEntity",  
        "customerWarehouseEntity.customerEntity",
      ], 
      where: { id: id }
    });

    // validate if article exists
    if (tempArticleEntity.length === 0) {
      throw new BadRequestException("Article by id not exists");
    }

    return tempArticleEntity[0];
  }

  async findByWarehouseId(id: string): Promise<WarehouseEntity> {
    const tempArticleEntity = await this.warehouseRepository.find({
      relations: [
        "customerWarehouseEntity",  
        "customerWarehouseEntity.customerEntity",
      ], 
      where: { warehouseId: id }
    });

    // validate if article exists
    if (tempArticleEntity.length === 0) {
      throw new BadRequestException("Article by id not exists");
    }

    return tempArticleEntity[0];
  }


  async add(articleEntity: WarehouseEntity): Promise<WarehouseEntity> {
    // save article
    return await this.warehouseRepository.save(articleEntity);
  }


  async put(articleEntity: WarehouseEntity, id: number): Promise<void> {
    const tempArticleEntity = await this.warehouseRepository.findOneBy({ id: id });
    
    // validate if article exists
    if (!tempArticleEntity) {
      throw new BadRequestException("Article by id not exists");
    }

    const changedArticleEntity = { ...tempArticleEntity, ...articleEntity };

    await this.warehouseRepository.save(changedArticleEntity);
  }


  async delete(id: number): Promise<void> {
    const tempArticleEntity = await this.warehouseRepository.findOneBy({ id: id });
    
    // validate if article exists
    if (!tempArticleEntity) {
      throw new BadRequestException("Article by id not exists");
    }

    await this.warehouseRepository.delete({ id });
  }

}
