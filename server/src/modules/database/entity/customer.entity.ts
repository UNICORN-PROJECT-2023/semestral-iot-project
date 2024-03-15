import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CustomerArticleEntity } from './customer-article.entity';

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

  @OneToMany(
    () => CustomerArticleEntity,
    (customerArticleEntity) => customerArticleEntity.customerEntity
  )
  customerArticleEntity: CustomerArticleEntity[];

  constructor(email?: string, username?: string, password?: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}
