import { ArticleEntity } from "src/modules/database/entity/article.entity";
import { ArticleType } from "src/modules/database/types/article-type.type";
import { ArticleInDto } from "../dto/article-in.dto";
import { ArticleOutDto } from "../dto/article-out.dto";
import { CategoryOutDto } from "../dto/category.out.dto";

export class ArticleTransformer {

  static dtoToEntity(articleInDto: ArticleInDto): ArticleEntity {
    const articleEntity = new ArticleEntity(
      articleInDto.name,
      articleInDto.description,
      0,
      "",
      articleInDto.materials
    );

    return articleEntity;
  }

  static entityToDto(articleEntity: ArticleEntity): ArticleOutDto {
    const owner = articleEntity.customerArticleEntity.find((customerArticle) => customerArticle.type === ArticleType.OWNER);
    const subscribers = articleEntity.customerArticleEntity.filter((customerArticle) => customerArticle.type === ArticleType.SUBSCRIBER);
    const categories = articleEntity.categoryArticleEntity.map((categoryArticle) => categoryArticle.categoryEntity);

    const articleDto = new ArticleOutDto(
      articleEntity.id,
      articleEntity.title,
      articleEntity.content,
      articleEntity.excerpt,
      articleEntity.featuredImageLink,
      articleEntity.tags,
      {
        id: owner?.customerEntity.id,
        name: owner?.customerEntity.username,
      },
      subscribers.map((subscriber) => {
        return ({
          id: subscriber?.customerEntity?.id,
          name: subscriber?.customerEntity?.username,
        })
      }),
      categories.map((category) => {
        return new CategoryOutDto(category.id, category.name)
      }),
      articleEntity.createdAt,
      articleEntity.updatedAt,
    );

    return articleDto;
  }
}
