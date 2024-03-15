import { ApiProperty } from "@nestjs/swagger";

export class ResponseDto<BodyType> {
  
  @ApiProperty({required: true})
  statusCode: number;

  @ApiProperty({required: true})
  message: string;

  @ApiProperty({required: false})
  body: BodyType;

  constructor(statusCode: number, message: string, body: BodyType)  {
    this.statusCode = statusCode;
    this.message = message;
    this.body = body;
  }

}

export class ResponseDtoBuilder<BodyType> {
  
  statusCode: number;

  message: string;

  body: BodyType;

  setStatusCode(statusCode: number): ResponseDtoBuilder<BodyType> {
    this.statusCode = statusCode;
    return this;
  }

  setMessage(message: string): ResponseDtoBuilder<BodyType> {
    this.message = message;
    return this;
  }

  setBody(body: BodyType): ResponseDtoBuilder<BodyType> {
    this.body = body;
    return this;
  }

  build(): ResponseDto<BodyType> {
    return new ResponseDto(this.statusCode, this.message, this.body);
  }

}