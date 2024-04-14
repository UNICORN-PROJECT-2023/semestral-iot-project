import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { UserType } from "../type/user-type";

export class UserLoginInDto {
  
  @IsEmail()
  @ApiProperty({required: true})
  email: string;

  @IsStrongPassword()
  @ApiProperty({required: true})
  password: string; 
  
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}