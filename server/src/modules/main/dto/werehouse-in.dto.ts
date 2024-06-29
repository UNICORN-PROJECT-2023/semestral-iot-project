import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength, isEnum } from "class-validator";
import { UserType } from "../type/user-type";

export class WerehouseInDto {

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({required: true})
  iotId: string;

  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({required: true})
  name: string;

  @IsNumber()
  @ApiProperty({required: true})
  minTemperature: number; 

  @IsNumber()
  @ApiProperty({required: true})
  maxTemperature: number;

  @IsNumber()
  @ApiProperty({required: true})
  alertDuration: number;


  constructor(iotId: string, name: string, minTemperature: number, maxTemperature: number, alertDuration: number) {
    this.iotId = iotId;
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
    this.alertDuration = alertDuration;
  }

}