import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CustomerWarehouseEntity } from './customer-warehouse.entity';
import { WarehouseEntity } from './warehouse.entity';

@Entity({ name: 'customer' })
export class CustomerEntity {
  @PrimaryGeneratedColumn({ name: 'c_id' })
  id: number;

  @Column({ name: 'c_email', unique: true })
  email: string;

  @Column({ name: 'c_username' })
  username: string;

  @Column({ name: 'c_password' })
  password: string;

  @CreateDateColumn({ name: 'c_created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'c_updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @OneToMany(
    () => CustomerWarehouseEntity,
    (customerWarehouseEntity) => customerWarehouseEntity.customerEntity
  )
  customerWarehouseEntity: CustomerWarehouseEntity[];

  constructor(email: string, username: string, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
