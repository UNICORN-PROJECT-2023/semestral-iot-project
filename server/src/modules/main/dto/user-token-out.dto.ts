import { ApiProperty } from "@nestjs/swagger";

export class UserTokenOutDto {
  
  @ApiProperty({required: true})
  token: string;

  constructor(token: string) {
    this.token = token;
  }

}