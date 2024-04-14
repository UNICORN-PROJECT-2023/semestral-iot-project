// import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
// import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
// import { Roles } from 'src/modules/guard/decorators/roles.decorator';
// import { ArticleService } from '../services/article.service';
// import { Request, Response } from 'express';
// import { ResponseDto, ResponseDtoBuilder } from '../dto/response.dto';
// import { ArticleOutDto } from '../dto/article-out.dto';
// import { ArticleInDto } from '../dto/article-in.dto';

// @ApiBearerAuth()
// @Controller("/article")
// export class ArticleController {
//   constructor(private readonly articleService: ArticleService) {}

//   @Get("/all")
//   @ApiQuery({ name: 'categoryId', type: Number, required: false })
//   async getAllArticles(@Req() req: any, @Query('categoryId') id: number): Promise<ResponseDto<Array<ArticleOutDto>>> {
//     const articleOutArray = await this.articleService.getAllArticles(id);

//     const response = new ResponseDtoBuilder<Array<ArticleOutDto>>()
//       .setStatusCode(HttpStatus.OK)
//       .setMessage("Received all articles")
//       .setBody(articleOutArray)
//       .build();

//     return response;
//   }

//   @Get("/me")
//   @Roles("user")
//   async getUserArticles(@Req() req: any): Promise<ResponseDto<Array<ArticleOutDto>>> {
//     const cstId = req.user.id;

//     const articleOutArray = await this.articleService.getAllArticlesOwner(cstId);

//     const response = new ResponseDtoBuilder<Array<ArticleOutDto>>()
//       .setStatusCode(HttpStatus.OK)
//       .setMessage("Received all user articles")
//       .setBody(articleOutArray)
//       .build();

//     return response;
//   }

//   @Get("/:articleId")
//   @ApiParam({ name: 'articleId', type: Number })
//   async getArticle(@Req() req: any, @Param('articleId') id: number): Promise<ResponseDto<ArticleOutDto>> {
//     const articleOut = await this.articleService.getArticleById(id);
    
//     const response = new ResponseDtoBuilder<ArticleOutDto>()
//       .setStatusCode(HttpStatus.OK)
//       .setMessage("Received article")
//       .setBody(articleOut)
//       .build();

//     return response;
//   }

//   @Post("/")
//   @Roles("user")
//   async postArticle(@Req() req: any, @Body() articleDto: ArticleInDto): Promise<ResponseDto<void>> {
//     const cstId = req.user.id;

//     await this.articleService.postArticle(articleDto, cstId);

//     const response = new ResponseDtoBuilder<void>()
//       .setStatusCode(HttpStatus.CREATED)
//       .setMessage("Article created")
//       .build();

//     return response;
//   }

//   @Put("/:articleId")
//   @Roles("user")
//   @ApiParam({ name: 'articleId', type: Number })
//   async updateArticle(@Req() req: any, @Param('articleId') id: number, @Body() articleDto: ArticleInDto): Promise<ResponseDto<void>> {
//     const cstId = req.user.id;

//     await this.articleService.putArticle(articleDto, id, cstId);

//     const response = new ResponseDtoBuilder<void>()
//       .setStatusCode(HttpStatus.OK)
//       .setMessage("Article updated")
//       .build();

//     return response;
//   }

//   @Delete("/:articleId")
//   @Roles("user")
//   @ApiParam({ name: 'articleId', type: Number })
//   async deleteArticle(@Req() req: any, @Param('articleId') id: number): Promise<ResponseDto<void>> {
//     const cstId = req.user.id;

//     await this.articleService.deleteArticle(id, cstId);

//     const response = new ResponseDtoBuilder<void>()
//       .setStatusCode(HttpStatus.OK)
//       .setMessage("Article deleted")
//       .build();
      
//     return response;
//   }
// }
