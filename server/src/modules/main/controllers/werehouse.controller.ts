import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
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
import { WerehouseService } from '../services/werehouse.service';
import { WerehouseRegisterInDto } from '../dto/werehouse-register-in.dto';
import { WerehouseRecordInDto } from '../dto/werehouse-record-in.dto';
import { WerehouseInDto } from '../dto/werehouse-in.dto';
import { WerehousePutInDto } from '../dto/werehouse-put-in.dto';
import { get } from 'http';

@ApiBearerAuth()
@Controller("/werehouse")
export class WerehouseController {
  constructor(private readonly werehouseService: WerehouseService) {}

  @Get("/")
  @Roles("user")
  @ApiTags('user')
  async getMyWerehouses(@Req() req: any): Promise<ResponseDto<void>> {
    // const werehouseEntity: WerehouseEntity = await this.werehouseService.getMyWerehouses(req.user.id);
  
    const response = new ResponseDtoBuilder<void>()
    .setStatusCode(200)
    .setMessage("Received werehouses")
    // .setBody(werehouseEntity)
    .build();
  
    return response;
  }

  @Post("/")
  @Roles("user")
  @ApiTags('user')
  async postNewWerehouse(@Req() req: any, @Body() werehouseInDto: WerehouseInDto): Promise<ResponseDto<void>> {
    // const werehouseEntity: WerehouseEntity = await this.werehouseService.getMyWerehouses(req.user.id);
  
    const response = new ResponseDtoBuilder<void>()
    .setStatusCode(200)
    .setMessage("Claimed new werehouse")
    // .setBody(werehouseEntity)
    .build();
  
    return response;
  }

  @Put("/:werehouseId")
  @Roles("user")
  @ApiTags('user')
  @ApiParam({ name: 'werehouseId', type: Number })
  async putWerehouse(@Req() req: any, @Body() werehousePutInDto: WerehousePutInDto): Promise<ResponseDto<void>> {
    // const werehouseEntity: WerehouseEntity = await this.werehouseService.getMyWerehouses(req.user.id);
  
    const response = new ResponseDtoBuilder<void>()
    .setStatusCode(200)
    .setMessage("Updated werehouse")
    // .setBody(werehouseEntity)
    .build();
  
    return response;
  }

  @Delete("/:werehouseId")
  @Roles("user")
  @ApiTags('user')
  @ApiParam({ name: 'werehouseId', type: Number })
  async deleteWerehouse(@Req() req: any): Promise<ResponseDto<void>> {
    // const werehouseEntity: WerehouseEntity = await this.werehouseService.getMyWerehouses(req.user.id);
  
    const response = new ResponseDtoBuilder<void>()
    .setStatusCode(200)
    .setMessage("Deleted werehouse")
    // .setBody(werehouseEntity)
    .build();
  
    return response;
  }

  
  @Get("/:werehouseId/record")
  @Roles("user")
  @ApiTags('user')
  @ApiParam({ name: 'werehouseId', type: Number })
  async getData( @Req() req: any ): Promise<ResponseDto<void>> {
    // await this.werehouseService.postData(werehouseInDto);
    
    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(200)
      .setMessage("Saved data")
      .build();

    return response;
  }

  @Post("record")
  @Roles("iot")
  @ApiTags('iot')
  async postData( @Body() werehouseInDto: WerehouseRecordInDto): Promise<ResponseDto<void>> {
    await this.werehouseService.postData(werehouseInDto);
    
    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(200)
      .setMessage("Saved data")
      .build();

    return response;
  }

  @Post("login")
  @ApiTags('anonymous', 'iot')
  async login( @Body() werehouseInDto: WerehouseRegisterInDto): Promise<ResponseDto<UserTokenOutDto>> {
    const userTokenOutDto: UserTokenOutDto = await this.werehouseService.login(werehouseInDto);
    
    const response = new ResponseDtoBuilder<UserTokenOutDto>()
      .setStatusCode(200)
      .setMessage("Logged in")
      .setBody(userTokenOutDto)
      .build();

    return response;
  }

  @Post("register")
  @ApiTags('anonymous', 'iot')
  async register( @Body() werehouseInDto: WerehouseRegisterInDto ): Promise<ResponseDto<UserTokenOutDto>> {
    const userTokenOutDto: UserTokenOutDto = await this.werehouseService.register(werehouseInDto);

    const response = new ResponseDtoBuilder<UserTokenOutDto>()
      .setStatusCode(200)
      .setMessage("Registered")
      .setBody(userTokenOutDto)
      .build();
      
    return response;
  }
}
