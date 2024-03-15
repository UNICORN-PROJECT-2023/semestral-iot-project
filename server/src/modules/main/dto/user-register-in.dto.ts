import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

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