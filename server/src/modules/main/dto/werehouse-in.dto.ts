import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength, isEnum } from "class-validator";
import { UserType } from "../type/user-type";

export class WerehouseInDto {

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({required: true})
  iotId: string;

  @IsNumber()
  @ApiProperty({required: true})
  minTemperature: Number; 

  @IsNumber()
  @ApiProperty({required: true})
  maxTemperature: Number;

  @IsNumber()
  @ApiProperty({required: true})
  alertDuration: Number;


  constructor(iotId: string, minTemperature: Number, maxTemperature: Number, alertDuration: Number) {
    this.iotId = iotId;
    this.minTemperature = minTemperature;
    this.maxTemperature = maxTemperature;
    this.alertDuration = alertDuration;
  }

}