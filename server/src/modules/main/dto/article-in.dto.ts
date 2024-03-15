import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, ValidateNested } from "class-validator";
import { CategoryOutDto } from "./category.out.dto";
import { CategoryInDto } from "./category.in.dto";
import { Type } from "class-transformer";

export class ArticleInDto {
  
  @IsString()
  @MinLength(1)
  @MaxLength(40)
  @ApiProperty({required: true})
  name: string;
  
  @IsString()
  @MinLength(1)
  @MaxLength(2000)
  @ApiProperty({required: false})
  description: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(0)
  @ArrayMaxSize(20)
  @ApiProperty({required: true})
  materials: Array<string>;

  @IsArray()
  @Type(() => CategoryInDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ApiProperty({ required: true, type: [CategoryInDto] })
  categories: Array<CategoryInDto>;

  
  constructor(name: string, description: string, episode: number, originalLink: string, materials: Array<string>, categories: Array<CategoryInDto>) {
    this.name = name;
    this.description = description;
    this.materials = materials;
    this.categories = categories;
  }
}
