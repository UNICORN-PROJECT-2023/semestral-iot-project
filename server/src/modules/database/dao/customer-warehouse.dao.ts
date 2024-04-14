import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerWarehouseEntity } from '../entity/customer-warehouse.entity';
import { CustomerEntity } from '../entity/customer.entity';
import { WarehouseEntity } from '../entity/warehouse.entity';
import { ArticleType } from '../types/article-type.type';

@Injectable()
export class CustomerWarehouseDao {
  constructor(
    @InjectRepository(CustomerWarehouseEntity)
    private customerWarehouseRepository: Repository<CustomerWarehouseEntity>,
    @InjectRepository(WarehouseEntity)
    private warehouseRepository: Repository<WarehouseEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  async add(articleId: string, cstId: number): Promise<void> {
    const tempCustomerArticleEntity: CustomerWarehouseEntity = await this.customerWarehouseRepository.findOne({where: {
      warehouseEntity: {
        warehouseId: articleId,
      },
      customerEntity: {
        id: cstId,
      }
    }});

    if(tempCustomerArticleEntity) {
      throw new ConflictException("User already have action on this warehouse")
    }

    const customerEntity = await this.customerRepository.findOneBy({id: cstId});
    const articleEntity = await this.warehouseRepository.findOneBy({warehouseId: articleId});

    if(!articleEntity) {
      throw new BadRequestException("Article by id not exists");
    }

    const customerArticleEntity = new CustomerWarehouseEntity(articleEntity, customerEntity);
    await this.customerWarehouseRepository.save(customerArticleEntity);
  }

  async delete(articleId: number, cstId: number): Promise<void> {
    const tempCustomerArticleEntity: CustomerWarehouseEntity = await this.customerWarehouseRepository.findOne({where: {
      warehouseEntity: {
        id: articleId,
      },
      customerEntity: {
        id: cstId,
      }
    }});

    if(!tempCustomerArticleEntity) {
      throw new ConflictException("User doesn't have action on this warehouse");
    }

    await this.customerWarehouseRepository.delete({id: tempCustomerArticleEntity.id});
  }
}
