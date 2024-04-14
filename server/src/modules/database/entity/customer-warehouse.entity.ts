import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ArticleType } from '../types/article-type.type';
import { CustomerEntity } from './customer.entity';
import { WarehouseEntity } from './warehouse.entity';

@Entity({ name: 'customer_warehouse' })
export class CustomerWarehouseEntity {
  @PrimaryGeneratedColumn({ name: 'cw_id' })
  id: number;

  @CreateDateColumn({ name: 'cw_created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'cw_updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @ManyToOne(() => WarehouseEntity, (warehouseEntity) => warehouseEntity.id)
  warehouseEntity: WarehouseEntity;

  @ManyToOne(() => CustomerEntity, (customerEntity) => customerEntity.id)
  customerEntity: CustomerEntity;
  

  constructor(warehouseEntity: WarehouseEntity, customerEntity: CustomerEntity) {
    this.warehouseEntity = warehouseEntity;
    this.customerEntity = customerEntity;
  }
}
