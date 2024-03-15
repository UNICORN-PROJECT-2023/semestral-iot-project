import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { CategoryDao } from 'src/modules/database/dao/category.dao';
import { CategoryOutDto } from '../dto/category.out.dto';
import { CategoryTransformer } from '../transformer/category.transformer';
import { CategoryInDto } from '../dto/category.in.dto';


@Injectable()
export class CategoryService {

  constructor(
    @Inject(CategoryDao)
    private categoryDao: CategoryDao,
  ) {}
  

  async getAllCategories(): Promise<Array<CategoryOutDto>> {
    const categoryEntity = await this.categoryDao.findAll();

    const category: Array<CategoryOutDto> = categoryEntity.map((entity) =>  CategoryTransformer.entityToDao(entity));

    return category;
  }


  async postCategory(categoryInDto: CategoryInDto): Promise<Array<CategoryOutDto>> {
    const categoryEntity = CategoryTransformer.dtoToEntity(categoryInDto);
    
    await this.categoryDao.add(categoryEntity);
    return;
  }

}


