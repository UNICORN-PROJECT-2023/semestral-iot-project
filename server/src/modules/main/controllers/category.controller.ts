import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Roles } from 'src/modules/guard/decorators/roles.decorator';
import { UserLoginInDto } from '../dto/user-login-in.dto';
import { UserRegisterInDto } from '../dto/user-register-in.dto';
import { UserTokenOutDto } from '../dto/user-token-out.dto';
import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import { ResponseDto, ResponseDtoBuilder } from '../dto/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { CustomerEntity } from 'src/modules/database/entity/customer.entity';
import { UserPutInDto } from '../dto/user-put-in.dto';
import { CategoryService } from '../services/category.service';
import { CategoryOutDto } from '../dto/category.out.dto';
import { CategoryInDto } from '../dto/category.in.dto';

@ApiBearerAuth()
@Controller("/category")
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    ) {}

  
  @Get("/all")
  async getAllCategories(@Req() req: any): Promise<ResponseDto<Array<CategoryOutDto>>> {

    const categoryDaoArray = await this.categoryService.getAllCategories();

    const response = new ResponseDtoBuilder<Array<CategoryOutDto>>()
    .setStatusCode(200)
    .setMessage("Received all categories")
    .setBody(categoryDaoArray)
    .build();

    return response;
  }

  @Post("/")
  @Roles("user")
  async postCategory(@Req() req: any, @Body() CategoryInDto: CategoryInDto): Promise<ResponseDto<void>> {

    await this.categoryService.postCategory(CategoryInDto);

    const response = new ResponseDtoBuilder<void>()
    .setStatusCode(200)
    .setMessage("posted new category")
    .build();

    return response;
  }

}
