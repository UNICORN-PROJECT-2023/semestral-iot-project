import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsArray, ArrayMinSize } from "class-validator";
import { ArticleAction } from "../type/article-action.type";

export class ArticleListInDto {
    
  @IsEnum(ArticleAction)
  @ApiProperty({ required: true, enum: ArticleAction })
  action: ArticleAction;

  constructor(action: ArticleAction) {
    this.action = action;
  }
}
