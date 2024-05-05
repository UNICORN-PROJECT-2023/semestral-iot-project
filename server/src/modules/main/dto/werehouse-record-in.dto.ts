import { ApiProperty } from "@nestjs/swagger";
import { ArrayMaxSize, ArrayMinSize, IsArray, IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength, ValidateNested, isEnum } from "class-validator";
import { UserType } from "../type/user-type";
import { Type } from "class-transformer";

export class WerehouseRecordInDto {
  
  @IsDateString()
  @ApiProperty({required: true})
  date: Date;

  @IsNumber()
  @ApiProperty({required: true})
  value: number; 
  
  constructor(date: Date, value: number) {
    this.date = date;
    this.value = value;
  }
}

export class WerehouseRecordBathInDto {

  @IsArray()
  @Type(() => WerehouseRecordInDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(12)
  @ApiProperty({ required: true, type: [WerehouseRecordInDto] })
  values: WerehouseRecordInDto[];

  constructor(values: WerehouseRecordInDto[]) {
    this.values = values;
  }
 
}