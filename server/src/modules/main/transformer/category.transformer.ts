import { CategoryOutDto } from "../dto/category.out.dto";
import { CategoryEntity } from "src/modules/database/entity/category.entity";
import { CategoryInDto } from "../dto/category.in.dto";

export class CategoryTransformer {

  static dtoToEntity(categoryDao: CategoryInDto): CategoryEntity {
    const cateogryEntity = new CategoryEntity(
      categoryDao.name,
    );

    return cateogryEntity;
  }

  static entityToDao(categoryEntity: CategoryEntity): CategoryOutDto {
    const categoryDao = new CategoryOutDto(
      categoryEntity.id,
      categoryEntity.name,
    )

    return categoryDao;
  }
}