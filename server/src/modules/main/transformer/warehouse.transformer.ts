import { WarehouseEntity } from "src/modules/database/entity/warehouse.entity";
import { ArticleType } from "src/modules/database/types/article-type.type";
import { ArticleInDto } from "../dto/article-in.dto";
import { ArticleOutDto } from "../dto/article-out.dto";
import { CategoryOutDto } from "../dto/category.out.dto";
import { WerehouseRecordInDto } from "../dto/werehouse-record-in.dto";
import { WarehouseLogsEntity } from "src/modules/database/entity/warehouse-logs.entity";
import { WerehouseInDto } from "../dto/werehouse-in.dto";

export class WarehouseTransformer {

  // static dtoToEntity(warehouseLogs: WerehouseInDto): WarehouseEntity {
  //   const warehouseLogsEntity = new WarehouseEntity(
  //     ,
  //     warehouseLogs.password,
  //     warehouseLogs.minTemperature,
  //     warehouseLogs.maxTemperature,
  //     warehouseLogs.maxHumidity
  //   );

  //   return warehouseLogsEntity;
  // }

  // static entityToDto(articleEntity: ArticleEntity): ArticleOutDto {
  //   const owner = articleEntity.customerArticleEntity.find((customerArticle) => customerArticle.type === ArticleType.OWNER);
  //   const subscribers = articleEntity.customerArticleEntity.filter((customerArticle) => customerArticle.type === ArticleType.SUBSCRIBER);
  //   const categories = articleEntity.categoryArticleEntity.map((categoryArticle) => categoryArticle.categoryEntity);

  //   const articleDto = new ArticleOutDto(
  //     articleEntity.id,
  //     articleEntity.title,
  //     articleEntity.content,
  //     articleEntity.excerpt,
  //     articleEntity.featuredImageLink,
  //     articleEntity.tags,
  //     {
  //       id: owner?.customerEntity.id,
  //       name: owner?.customerEntity.username,
  //     },
  //     subscribers.map((subscriber) => {
  //       return ({
  //         id: subscriber?.customerEntity?.id,
  //         name: subscriber?.customerEntity?.username,
  //       })
  //     }),
  //     categories.map((category) => {
  //       return new CategoryOutDto(category.id, category.name)
  //     }),
  //     articleEntity.createdAt,
  //     articleEntity.updatedAt,
  //   );

  //   return articleDto;
  // }
}
