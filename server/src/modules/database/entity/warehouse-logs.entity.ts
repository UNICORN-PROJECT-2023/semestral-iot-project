import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WarehouseEntity } from './warehouse.entity';

@Entity({ name: 'warehouse_logs' })
export class WarehouseLogsEntity {
  @PrimaryGeneratedColumn({ name: 'wl_id' })
  id: number;

  @Column({ name: 'wl_measurement_date', type: "timestamp" })
  date: Date;

  @Column({ name: 'wl_temperature', type: "float" })
  temperature: number;

  @CreateDateColumn({ name: 'wl_created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'wl_updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @ManyToOne(() => WarehouseEntity, (articleEntity) => articleEntity.warehouseLogsEntity, { onDelete: 'CASCADE' })
  warehouseEntity: WarehouseEntity;

  constructor(date: Date, temperature: number, warehouseEntity: WarehouseEntity) {
    this.date = date;
    this.temperature = temperature;
    this.warehouseEntity = warehouseEntity;
  }
}
