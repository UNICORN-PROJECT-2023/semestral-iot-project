import { Body, Controller, Get, HttpStatus, Post, Put, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/modules/guard/decorators/roles.decorator';
import { UserLoginInDto } from '../dto/user-login-in.dto';
import { UserRegisterInDto } from '../dto/user-register-in.dto';
import { UserTokenOutDto } from '../dto/user-token-out.dto';
import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import { ResponseDto, ResponseDtoBuilder } from '../dto/response.dto';
import { AuthGuard } from '@nestjs/passport';
import { CustomerEntity } from 'src/modules/database/entity/customer.entity';
import { UserPutInDto } from '../dto/user-put-in.dto';

@ApiBearerAuth()
@Controller("/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("me")
  @Roles("user")
  @ApiTags('user')
  async getMe(@Req() req: any): Promise<ResponseDto<CustomerEntity>> {
    const customerEntity: CustomerEntity = await this.userService.getMe(req.user.id);

    const response = new ResponseDtoBuilder<CustomerEntity>()
    .setStatusCode(200)
    .setMessage("Received user")
    .setBody(customerEntity)
    .build();

    return response;
  }

  @Put("me")
  @Roles("user")
  @ApiTags('user')
  async putMe(@Req() req: any,@Body() userDto: UserPutInDto): Promise<ResponseDto<CustomerEntity>> {
    const customerEntity: CustomerEntity = await this.userService.putMe(req.user.id, userDto);

    const response = new ResponseDtoBuilder<CustomerEntity>()
    .setStatusCode(200)
    .setMessage("Updated user")
    .setBody(customerEntity)
    .build();

    return response;
  }

  @Post("login")
  @ApiTags('anonymous', 'user')
  async login( @Body() userDto: UserLoginInDto): Promise<ResponseDto<UserTokenOutDto>> {
    const userTokenOutDto: UserTokenOutDto = await this.userService.login(userDto);
    
    const response = new ResponseDtoBuilder<UserTokenOutDto>()
      .setStatusCode(200)
      .setMessage("Logged in")
      .setBody(userTokenOutDto)
      .build();

    return response;
  }

  @Post("register")
  @ApiTags('anonymous', 'user')
  async register( @Body() userDto: UserRegisterInDto ): Promise<ResponseDto<UserTokenOutDto>> {
    const userTokenOutDto: UserTokenOutDto = await this.userService.register(userDto);

    const response = new ResponseDtoBuilder<UserTokenOutDto>()
      .setStatusCode(200)
      .setMessage("Registered")
      .setBody(userTokenOutDto)
      .build();
      
    return response;
  }
}
