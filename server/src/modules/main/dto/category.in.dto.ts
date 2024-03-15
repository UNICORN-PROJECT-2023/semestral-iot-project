import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CategoryInDto {

  @IsString()
  @MinLength(1)
  @MaxLength(200)
  @ApiProperty({required: true})
  name: string;
 
  constructor(name: string) {
    this.name = name;
  }
}