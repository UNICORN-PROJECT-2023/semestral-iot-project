import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { CustomerArticleEntity } from './customer-article.entity';
import { CategoryArticleEntity } from './category-article.entity';

@Entity({ name: 'article' })
export class ArticleEntity {
  @PrimaryGeneratedColumn({ name: 'a_id' })
  id: number;

  @Column({ name: 'a_title' })
  title: string;

  @Column({ name: 'a_content' })
  content: string;

  @Column({ name: 'a_excerpt' })
  excerpt: number;

  @Column({ name: 'a_featured_image_link' })
  featuredImageLink: string;

  @Column("text", { name: 'a_tags', array: true })
  tags: string[];

  @CreateDateColumn({ name: 'a_created_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'a_updated_at', type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @OneToMany(
    () => CustomerArticleEntity,
    (customerArticleEntity) => customerArticleEntity.articleEntity, { onDelete: 'CASCADE' }
  )
  customerArticleEntity: CustomerArticleEntity[];

  @OneToMany(
    () => CategoryArticleEntity,
    (categoryArticleEntity) => categoryArticleEntity.articleEntity, { onDelete: 'CASCADE' }
  )
  categoryArticleEntity: CategoryArticleEntity[];
  
  constructor(title: string, content: string, excerpt: number, featuredImageLink: string, tags: Array<string>) {
    this.title = title;
    this.content = content;
    this.excerpt = excerpt;
    this.featuredImageLink = featuredImageLink;
    this.tags = tags;
  }
}
