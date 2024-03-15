import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import passport from 'passport';
import { CustomerDao } from 'src/modules/database/dao/customer.dao';
import { CustomerEntity } from 'src/modules/database/entity/customer.entity';
import { UserLoginInDto } from '../dto/user-login-in.dto';
import { UserRegisterInDto } from '../dto/user-register-in.dto';
import { UserTokenOutDto } from '../dto/user-token-out.dto';
import { PasswordService } from './password.service';
import { JwtService } from 'src/modules/guard/service/jwt.service';
import { UserPutInDto } from '../dto/user-put-in.dto';
import { ArticleOutDto } from '../dto/article-out.dto';
import { ArticleDao } from 'src/modules/database/dao/article.dao';
import { ArticleTransformer } from '../transformer/article.transformer';
import { ArticleInDto } from '../dto/article-in.dto';
import { ArticleType } from 'src/modules/database/types/article-type.type';
import { CustomerArticleDao } from 'src/modules/database/dao/customer-article.dao';

@Injectable()
export class ArticleListService {
  constructor(
    @Inject(ArticleDao)
    private articleDao: ArticleDao,
    @Inject(CustomerArticleDao)
    private customerArticleDao: CustomerArticleDao,
  ) {}

  async getAllArticlesList(cstId: number): Promise<Array<ArticleOutDto>> {
    const articleEntityArray = await this.articleDao.findAll();

    const articleDtoArray: Array<ArticleOutDto> = articleEntityArray
      .filter((articleEntity) => articleEntity.customerArticleEntity.find(
        (customer) => customer.customerEntity.id == cstId && customer.type === ArticleType.SUBSCRIBER)
      )
      .map(
        (articleEntity) => ArticleTransformer.entityToDto(articleEntity)
      ); 

    return articleDtoArray;
  }

  async postArticleList(articleId: number, cstId: number): Promise<void> {
    await this.customerArticleDao.add(articleId, cstId);
  }

  async deleteArticleList(articleId: number, cstId: number): Promise<void> {
    await this.customerArticleDao.delete(articleId, cstId);
  }
}
