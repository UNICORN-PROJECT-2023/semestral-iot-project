import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ArticleType } from '../types/article-type.type';
import { CustomerEntity } from './customer.entity';
import { ArticleEntity } from './article.entity';

@Entity({ name: 'customer_article' })
export class CustomerArticleEntity {
  @PrimaryGeneratedColumn({ name: 'ca_id' })
  id: number;

  @Column({ name: 'ca_type', default: null })
  type: ArticleType;

  @ManyToOne(() => ArticleEntity, (articleEntity) => articleEntity.id, { onDelete: 'CASCADE' })
  articleEntity: ArticleEntity;

  @ManyToOne(() => CustomerEntity, (customerEntity) => customerEntity.id)
  customerEntity: CustomerEntity;

  constructor(type: ArticleType, articleEntity: ArticleEntity, customerEntity: CustomerEntity) {
    this.type = type;
    this.articleEntity = articleEntity;
    this.customerEntity = customerEntity;
  }
}
