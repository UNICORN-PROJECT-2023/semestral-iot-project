import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength, isEnum } from "class-validator";
import { UserType } from "../type/user-type";

export class WerehouseLoginInDto {

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @ApiProperty({required: true})
  id: string;

  @IsStrongPassword()
  @ApiProperty({required: true})
  password: string; 
  
  constructor(id: string, password: string) {
    this.id = id;
    this.password = password;
  }
}