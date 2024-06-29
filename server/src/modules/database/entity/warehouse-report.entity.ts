import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { WarehouseEntity } from './warehouse.entity';

@Entity({ name: 'warehouse_report' })
export class WarehouseReportEntity {
  @PrimaryGeneratedColumn({ name: 'wr_id' })
  id: number;

  @Column({ name: 'wr_temperature', type: "float" })
  temperature: number;

  @CreateDateColumn({ name: 'wr_created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'wr_updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @ManyToOne(() => WarehouseEntity, (articleEntity) => articleEntity.warehouseLogsEntity, { onDelete: 'CASCADE' })
  warehouseEntity: WarehouseEntity;

  constructor(temperature: number, warehouseEntity: WarehouseEntity) {
    this.temperature = temperature;
    this.warehouseEntity = warehouseEntity;
  }
}
