import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CategoryArticleEntity } from './category-article.entity';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn({ name: 'ca_id' })
  id: number;

  @Column({ name: 'ca_name' })
  name: string;

  @OneToMany(
    () => CategoryArticleEntity,
    (categoryArticleEntity) => categoryArticleEntity.categoryEntity, { onDelete: 'CASCADE' }
  )
  categoryArticleEntity: CategoryArticleEntity[];
  
  constructor(name: string) {
    this.name = name;
  }
}
