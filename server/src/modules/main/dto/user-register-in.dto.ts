import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength, isEnum } from "class-validator";
import { UserType } from "../type/user-type";

export class UserRegisterInDto {
  
  @IsEmail()
  @ApiProperty({required: true})
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @ApiProperty({required: true})
  username: string;

  @IsStrongPassword()
  @ApiProperty({required: true})
  password: string; 
  
  constructor(email: string, username: string, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}