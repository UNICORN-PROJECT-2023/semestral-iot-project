import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, isEnum } from "class-validator";
import { UserType } from "../type/user-type";

export class WerehousePutInDto {

  @IsOptional()
  @IsNumber()
  @ApiProperty({required: true})
  minTemperature: Number; 

  @IsOptional()
  @IsNumber()
  @ApiProperty({required: true})
  maxTemperature: Number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({required: true})
  alertDuration: Number;


  constructor(minTemperature: Number, maxTemperature: Number, alertDuration: Number) {
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
    this.alertDuration = alertDuration;
  }

}