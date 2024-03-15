import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterInDto } from 'src/modules/main/dto/user-register-in.dto';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../entity/category.entity';

@Injectable()
export class CategoryDao {
  
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async findById(id: number): Promise<CategoryEntity> {
    const categoryEntity = await this.categoryRepository.find({where: {id: id}});

    // validate if category exists
    if (categoryEntity.length === 0) {
      throw new BadRequestException("Category by id not exists");
    }

    return categoryEntity[0];
  }

  async findByName(name: string): Promise<CategoryEntity> {
    const categoryEntity = await this.categoryRepository.find({where: {name: name}});

    // validate if category exists
    if (categoryEntity.length === 0) {
      throw new BadRequestException("Category by name not exists");
    }

    return categoryEntity[0];
  }

  async add(categoryEntity: CategoryEntity): Promise<void> {

    // save category
    await this.categoryRepository.save(categoryEntity);
  }

  async put(categoryEntity: CategoryEntity, id: number): Promise<void> {
    const tempCategoryEntity = await this.categoryRepository.findOneBy({ id: id });

    // validate if category exists
    if (!tempCategoryEntity) {
      throw new BadRequestException("Category by id not exists");
    }

    const changedCategoryEntity = { ...tempCategoryEntity, ...categoryEntity };

    await this.categoryRepository.save(changedCategoryEntity);
  }

  async delete(id: number): Promise<void> {
    const tempCategoryEntity = await this.categoryRepository.findOneBy({ id: id });

    // validate if category exists
    if (!tempCategoryEntity) {
      throw new BadRequestException("Category by id not exists");
    }

    await this.categoryRepository.delete({ id });
  }
}
