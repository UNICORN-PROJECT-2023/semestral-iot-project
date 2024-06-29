import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength, isEnum } from "class-validator";
import { UserType } from "../type/user-type";

export class WerehousePutInDto {

  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({required: true})
  name: string;

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


  constructor(name: string, minTemperature: number, maxTemperature: number, alertDuration: number) {
    this.name = name;
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
    this.alertDuration = alertDuration;
  }

}