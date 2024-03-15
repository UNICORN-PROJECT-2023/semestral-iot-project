import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerArticleEntity } from '../entity/customer-article.entity';
import { CustomerEntity } from '../entity/customer.entity';
import { ArticleEntity } from '../entity/article.entity';
import { ArticleType } from '../types/article-type.type';

@Injectable()
export class ArticleDao {
  
  constructor(
    @InjectRepository(CustomerEntity)
    private usersRepository: Repository<CustomerEntity>,
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    @InjectRepository(CustomerArticleEntity)
    private usersArticleRepository: Repository<CustomerArticleEntity>,
  ) {}


  async findAll(): Promise<ArticleEntity[]> {
    return await this.articleRepository.find({relations: [
      "customerArticleEntity",  
      "customerArticleEntity.customerEntity",
      "categoryArticleEntity",  
      "categoryArticleEntity.categoryEntity"
    ]});
  }


  async findById(id: number): Promise<ArticleEntity> {
    const tempArticleEntity = await this.articleRepository.find({
      relations: [
        "customerArticleEntity",  
        "customerArticleEntity.customerEntity",
        "categoryArticleEntity",  
        "categoryArticleEntity.categoryEntity"
      ], 
      where: { id: id }
    });

    // validate if article exists
    if (tempArticleEntity.length === 0) {
      throw new BadRequestException("Article by id not exists");
    }

    return tempArticleEntity[0];
  }


  async add(articleEntity: ArticleEntity, cstId: number): Promise<void> {
    const customerEntity: CustomerEntity = await this.usersRepository.findOneBy({ id: cstId });

    // save article
    const savedArticleEntity: ArticleEntity = await this.articleRepository.save(articleEntity);

    // link customer to article
    const customerArticleEntity = new CustomerArticleEntity(ArticleType.OWNER, savedArticleEntity, customerEntity);
    
    await this.usersArticleRepository.save(customerArticleEntity);
  }


  async put(articleEntity: ArticleEntity, id: number): Promise<void> {
    const tempArticleEntity = await this.articleRepository.findOneBy({ id: id });
    
    // validate if article exists
    if (!tempArticleEntity) {
      throw new BadRequestException("Article by id not exists");
    }

    const changedArticleEntity = { ...tempArticleEntity, ...articleEntity };

    await this.articleRepository.save(changedArticleEntity);
  }


  async delete(id: number): Promise<void> {
    const tempArticleEntity = await this.articleRepository.findOneBy({ id: id });
    
    // validate if article exists
    if (!tempArticleEntity) {
      throw new BadRequestException("Article by id not exists");
    }

    await this.articleRepository.delete({ id });
  }

}
