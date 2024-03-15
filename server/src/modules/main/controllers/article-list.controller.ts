import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/modules/guard/decorators/roles.decorator';
import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import { ResponseDto, ResponseDtoBuilder } from '../dto/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { ArticleOutDto } from '../dto/article-out.dto';
import { ArticleListService } from '../services/article-list.service';
import { ArticleService } from '../services/article.service';

@ApiBearerAuth()
@Controller("/article/list")
export class ArticleListController {
  constructor(
    private readonly articleListService: ArticleListService,
    private readonly articleService: ArticleService,
  ) {}

  @Get("/all")
  @Roles("user")
  async getAllArticles(@Req() req: any): Promise<ResponseDto<Array<ArticleOutDto>>> {
    const cstId = req.user.id;

    const articleDaoArray = await this.articleService.getAllArticlesSubscribers(cstId);

    const response = new ResponseDtoBuilder<Array<ArticleOutDto>>()
    .setStatusCode(200)
    .setMessage("Received all articles")
    .setBody(articleDaoArray)
    .build();

    return response;
  }

  @Post("/:articleId")
  @Roles("user")
  @ApiParam({ name: 'articleId', type: Number })
  async postArticle(@Req() req: any, @Param('articleId') id: number): Promise<ResponseDto<void>> {
    const cstId = req.user.id;

    await this.articleListService.postArticleList(id, cstId);

    const response = new ResponseDtoBuilder<void>()
    .setStatusCode(200)
    .setMessage("Added article to list")
    .build();

    return response;
  }

  @Delete("/:articleId")
  @Roles("user")
  @ApiParam({ name: 'articleId', type: Number })
  async deleteArticle(@Req() req: any, @Param('articleId') id: number): Promise<ResponseDto<void>> {
    const cstId: number = req.user.id;

    await this.articleListService.deleteArticleList(id, cstId);

    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(200)
      .setMessage("Deleted article from list")
      .build();
      
    return response;
  }
}
