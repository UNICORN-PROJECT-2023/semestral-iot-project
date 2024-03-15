import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class UserPutInDto {
  
  @IsEmail()
  @IsOptional()
  @ApiProperty({required: false})
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @IsOptional()
  @ApiProperty({required: false})
  username: string;

  @IsStrongPassword()
  @IsOptional()
  @ApiProperty({required: false})
  password: string; 
  
  constructor(email?: string, username?: string, password?: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}