import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CustomerWarehouseEntity } from './customer-warehouse.entity';
import { WarehouseLogsEntity } from './warehouse-logs.entity';

@Entity({ name: 'warehouse' })
export class WarehouseEntity {
  @PrimaryGeneratedColumn({ name: 'w_id' })
  id: number;

  @Column({ name: 'w_warehouse_id' })
  warehouseId: string;

  @Column({ name: 'w_password' })
  password: string;

  @Column({ name: 'w_temperature_min', type: "float"})
  temperatureMin: number;

  @Column({ name: 'w_temperature_max', type: "float"})
  temperatureMax: number;

  @Column({ name: 'w_allert_min_duration', type: "float"})
  allertMinDuration: number;

  @CreateDateColumn({ name: 'w_created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'w_updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @OneToMany(
    () => CustomerWarehouseEntity,
    (customerArticleEntity) => customerArticleEntity.warehouseEntity, { onDelete: 'CASCADE' }
  )
  customerWarehouseEntity: CustomerWarehouseEntity[];

  @OneToMany(
    () => WarehouseLogsEntity,
    (warehouseLogsEntity) => warehouseLogsEntity.warehouseEntity, { onDelete: 'CASCADE' }
  )
  warehouseLogsEntity: WarehouseLogsEntity[];
  
  constructor(
    warehouseId: string,
    password: string,
    temperatureMin: number,
    temperatureMax: number,
    allertMinDuration: number,
  ) {
    this.warehouseId = warehouseId;
    this.password = password;
    this.temperatureMin = temperatureMin;
    this.temperatureMax = temperatureMax;
    this.allertMinDuration = allertMinDuration;
  }
}
