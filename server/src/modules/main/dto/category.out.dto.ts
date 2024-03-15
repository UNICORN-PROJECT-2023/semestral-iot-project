import { ApiProperty } from "@nestjs/swagger";

export class CategoryOutDto {

  @ApiProperty({required: true})
  id: number;

  @ApiProperty({required: true})
  name: string;
 
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}