import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CategoryEntity } from './category.entity';

@Entity({ name: 'category_article' })
export class CategoryArticleEntity {
  @PrimaryGeneratedColumn({ name: 'ca_id' })
  id: number;

  @ManyToOne(() => ArticleEntity, (articleEntity) => articleEntity.categoryArticleEntity, { onDelete: 'CASCADE' })
  articleEntity: ArticleEntity;

  @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.categoryArticleEntity)
  categoryEntity: CategoryEntity;

  constructor(articleEntity: ArticleEntity, categoryEntity: CategoryEntity) {
    this.articleEntity = articleEntity;
    this.categoryEntity = categoryEntity;
  }
}
