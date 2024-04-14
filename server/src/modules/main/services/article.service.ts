// import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
// import passport from 'passport';
// import { CustomerDao } from 'src/modules/database/dao/customer.dao';
// import { CustomerEntity } from 'src/modules/database/entity/customer.entity';
// import { UserLoginInDto } from '../dto/user-login-in.dto';
// import { UserRegisterInDto } from '../dto/user-register-in.dto';
// import { UserTokenOutDto } from '../dto/user-token-out.dto';
// import { PasswordService } from './password.service';
// import { JwtService } from 'src/modules/guard/service/jwt.service';
// import { UserPutInDto } from '../dto/user-put-in.dto';
// import { ArticleOutDto } from '../dto/article-out.dto';
// import { ArticleDao } from 'src/modules/database/dao/warehouse.dao';
// import { ArticleTransformer } from '../transformer/warehouse.transformer';
// import { ArticleInDto } from '../dto/article-in.dto';
// import { ArticleType } from 'src/modules/database/types/article-type.type';
// import { CategoryArticleDao } from 'src/modules/database/dao/warehouseLogs.dao';
// import { CategoryDao } from 'src/modules/database/dao/category.dao';

// @Injectable()
// export class ArticleService {

//   constructor(
//     @Inject(ArticleDao)
//     private articleDao: ArticleDao,
//     @Inject(CategoryDao)
//     private categoryDao: CategoryDao,
//     @Inject(CategoryArticleDao)
//     private categoryArticleDao: CategoryArticleDao,
//   ) {}

//   async getAllArticlesSubscribers(cstId: number): Promise<Array<ArticleOutDto>> {
//     const articleEntityArray = await this.articleDao.findAll();

//     const articleDaoArray: Array<ArticleOutDto> = articleEntityArray
//       .filter((articleEntity) => articleEntity.customerArticleEntity.find(
//         (customer) => customer.customerEntity.id == cstId && customer.type === ArticleType.SUBSCRIBER)
//       )
//       .map(
//         (articleEntity) => ArticleTransformer.entityToDto(articleEntity)
//       );

//     return articleDaoArray;
//   }

//   async getAllArticlesOwner(cstId: number): Promise<Array<ArticleOutDto>> {
//     const articleEntityArray = await this.articleDao.findAll();

//     const articleDaoArray: Array<ArticleOutDto> = articleEntityArray
//       .filter((articleEntity) => articleEntity.customerArticleEntity.find(
//         (customer) => customer.customerEntity.id == cstId && customer.type === ArticleType.OWNER)
//       )
//       .map(
//         (articleEntity) => ArticleTransformer.entityToDto(articleEntity)
//       );

//     return articleDaoArray;
//   }
  
//   async getAllArticles(catId?: number): Promise<Array<ArticleOutDto>> {
//     const articleEntityArray = await this.articleDao.findAll();

//     const articleDaoArray: Array<ArticleOutDto> = articleEntityArray
//     .filter((articleEntity) => catId == undefined || articleEntity.categoryArticleEntity.find((categoryArticle) => catId == categoryArticle.categoryEntity.id))
//     .map((articleEntity) => ArticleTransformer.entityToDto(articleEntity)); 

//     return articleDaoArray;
//   }

//   async getArticleById(articleId: number): Promise<ArticleOutDto> {
//     const articleEntity = await this.articleDao.findById(articleId);

//     const articleDto: ArticleOutDto = ArticleTransformer.entityToDto(articleEntity);

//     return articleDto;
//   }

//   async postArticle(articleInDto: ArticleInDto, cstId: number): Promise<void> {
//     const articleEntity = ArticleTransformer.dtoToEntity(articleInDto);

//     // find and validate categories
//     const categoryEntityArray = [];
//     for(const category of articleInDto.categories) {
//       const categoryEntity = await this.categoryDao.findByName(category.name);
//       categoryEntityArray.push(categoryEntity);
//     }
    
//     // save article
//     await this.articleDao.add(articleEntity, cstId);

//     // save article categories
//     const entityPromises = [];
//     for(const categoryEntity of categoryEntityArray)  {
//       entityPromises.push(this.categoryArticleDao.add(articleEntity.id, categoryEntity.id))
//     }

//     await Promise.all(entityPromises);
//   }


//   async putArticle(articleInDto: ArticleInDto, articleId: number, cstId: number): Promise<void> {
//     const articleEntity = ArticleTransformer.dtoToEntity(articleInDto);

//     // validate if user is owner
//     const tempArticleEntity = await this.articleDao.findById(articleId);
//     const tempArticleDto = ArticleTransformer.entityToDto(tempArticleEntity);

//     if(tempArticleDto.owner.id != cstId)  {
//       throw new ForbiddenException("User is not owner");
//     }

//     // find and validate categories
//     const categoryEntityArray = [];
//     for(const category of articleInDto.categories) {
//       const categoryEntity = await this.categoryDao.findByName(category.name);
//       categoryEntityArray.push(categoryEntity);
//     }

//     // update saved article
//     await this.articleDao.put(articleEntity, articleId);

//     // delete old article categories
//     await this.categoryArticleDao.remove(articleId, undefined);

//     // save new article categories
//     const entityPromises = [];
//     for (const categoryEntity of categoryEntityArray) {
//       entityPromises.push(this.categoryArticleDao.add(articleId, categoryEntity.id));
//     }

//     await Promise.all(entityPromises);
//   }

//   async deleteArticle(articleId: number, cstId: number): Promise<void> {
//     // validate if user is owner
//     const tempArticleEntity = await this.articleDao.findById(articleId);
//     const tempArticleDto = ArticleTransformer.entityToDto(tempArticleEntity);

//     if (tempArticleDto.owner.id != cstId) {
//       throw new ForbiddenException("User is not owner");
//     }

//     await this.articleDao.delete(articleId);
//   }
// }
