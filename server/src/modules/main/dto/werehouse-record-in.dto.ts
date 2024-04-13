import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength, isEnum } from "class-validator";
import { UserType } from "../type/user-type";

export class WerehouseRecordInDto {

  @IsDate()
  @ApiProperty({required: true})
  date: Date;

  @IsNumber()
  @ApiProperty({required: true})
  value: Number; 
  
  constructor(date: Date, value: Number) {
    this.date = date;
    this.value = value;
  }
}