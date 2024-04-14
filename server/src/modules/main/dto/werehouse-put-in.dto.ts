import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, isEnum } from "class-validator";
import { UserType } from "../type/user-type";

export class WerehousePutInDto {

  @IsOptional()
  @IsNumber()
  @ApiProperty({required: true})
  minTemperature: number; 

  @IsOptional()
  @IsNumber()
  @ApiProperty({required: true})
  maxTemperature: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({required: true})
  alertDuration: number;


  constructor(minTemperature: number, maxTemperature: number, alertDuration: number) {
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
    this.alertDuration = alertDuration;
  }

}