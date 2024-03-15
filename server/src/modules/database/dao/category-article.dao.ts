import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entity/category.entity';
import { CategoryArticleEntity } from '../entity/category-article.entity';
import { ArticleEntity } from '../entity/article.entity';

@Injectable()
export class CategoryArticleDao {
  constructor(
    @InjectRepository(CategoryArticleEntity)
    private categoryArticleRepository: Repository<CategoryArticleEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
  ) {}

  async add(articleId: number, categoryId: number): Promise<void> {
    const tempCategoryArticleEntity: CategoryArticleEntity = await this.categoryArticleRepository.findOne({
      where: {
        articleEntity: {
          id: articleId,
        },
        categoryEntity: {
          id: categoryId,
        },
      },
    });

    if (tempCategoryArticleEntity) {
      throw new ConflictException('Article is already in this category');
    }

    const categoryEntity = await this.categoryRepository.findOneBy({ id: categoryId });
    const articleEntity = await this.articleRepository.findOneBy({ id: articleId });

    if (!articleEntity) {
      throw new BadRequestException('Article by id does not exist');
    }

    const categoryArticleEntity = new CategoryArticleEntity(articleEntity, categoryEntity);
    await this.categoryArticleRepository.save(categoryArticleEntity);
  }

  async remove(articleId: number, categoryId: number): Promise<void> {
    const tempCategoryArticleEntity: CategoryArticleEntity = await this.categoryArticleRepository.findOne({
      where: {
        articleEntity: {
          id: articleId,
        },
        categoryEntity: {
          id: categoryId,
        },
      },
    });

    if (!tempCategoryArticleEntity) {
      return;
    }

    await this.categoryArticleRepository.delete(tempCategoryArticleEntity.id);
  }
}
