import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength, isEnum } from "class-validator";
import { UserType } from "../type/user-type";

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