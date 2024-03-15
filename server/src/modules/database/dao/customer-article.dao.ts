import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerArticleEntity } from '../entity/customer-article.entity';
import { CustomerEntity } from '../entity/customer.entity';
import { ArticleEntity } from '../entity/article.entity';
import { ArticleType } from '../types/article-type.type';

@Injectable()
export class CustomerArticleDao {
  constructor(
    @InjectRepository(CustomerArticleEntity)
    private usersArticleRepository: Repository<CustomerArticleEntity>,
    @InjectRepository(ArticleEntity)
    private articleRepository: Repository<ArticleEntity>,
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
  ) {}

  async add(articleId: number, cstId: number): Promise<void> {
    const tempCustomerArticleEntity: CustomerArticleEntity = await this.usersArticleRepository.findOne({where: {
      type: ArticleType.SUBSCRIBER,
      articleEntity: {
        id: articleId,
      },
      customerEntity: {
        id: cstId,
      }
    }});

    if(tempCustomerArticleEntity) {
      throw new ConflictException("User already have action on this article")
    }

    const customerEntity = await this.customerRepository.findOneBy({id: cstId});
    const articleEntity = await this.articleRepository.findOneBy({id: articleId});

    if(!articleEntity) {
      throw new BadRequestException("Article by id not exists");
    }

    const customerArticleEntity = new CustomerArticleEntity(ArticleType.SUBSCRIBER, articleEntity, customerEntity);
    await this.usersArticleRepository.save(customerArticleEntity);
  }

  async delete(articleId: number, cstId: number): Promise<void> {
    const tempCustomerArticleEntity: CustomerArticleEntity = await this.usersArticleRepository.findOne({where: {
      type: ArticleType.SUBSCRIBER,
      articleEntity: {
        id: articleId,
      },
      customerEntity: {
        id: cstId,
      }
    }});

    if(!tempCustomerArticleEntity) {
      throw new ConflictException("User doesn't have action on this article");
    }

    await this.usersArticleRepository.delete({id: tempCustomerArticleEntity.id});
  }
}
