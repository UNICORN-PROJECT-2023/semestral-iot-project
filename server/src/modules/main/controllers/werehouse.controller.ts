import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Req, Res, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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
import { WerehouseRecordBathInDto, WerehouseRecordInDto } from '../dto/werehouse-record-in.dto';
import { WerehouseInDto } from '../dto/werehouse-in.dto';
import { WerehousePutInDto } from '../dto/werehouse-put-in.dto';
import { get } from 'http';
import { WarehouseEntity } from 'src/modules/database/entity/warehouse.entity';
import { WarehouseLogsEntity } from 'src/modules/database/entity/warehouse-logs.entity';
import { WerehouseLoginInDto } from '../dto/werehouse-login-in.dto';

@ApiBearerAuth()
@Controller("/warehouse")
export class WerehouseController {
  constructor(private readonly werehouseService: WerehouseService) {}

  @Get("/")
  @Roles("user")
  @ApiTags('user')
  async getMyWerehouses(@Req() req: any): Promise<ResponseDto<WarehouseEntity[]>> {
    const werehouseEntity: WarehouseEntity[] = await this.werehouseService.getUserWerehouses(req.user.id);
  
    const response = new ResponseDtoBuilder<WarehouseEntity[]>()
    .setStatusCode(200)
    .setMessage("Received werehouses")
    .setBody(werehouseEntity)
    .build();
  
    return response;
  }

  @Post("/")
  @Roles("user")
  @ApiTags('user')
  async postNewWerehouse(@Req() req: any, @Body() warehouseInDto: WerehouseInDto): Promise<ResponseDto<WarehouseEntity>> {
    const werehouseEntity: WarehouseEntity = await this.werehouseService.addNewWarehouse(warehouseInDto, req.user.id);
  
    const response = new ResponseDtoBuilder<WarehouseEntity>()
    .setStatusCode(200)
    .setMessage("Claimed new werehouse")
    .setBody(werehouseEntity)
    .build();
  
    return response;
  }

  @Put("/:warehouseId")
  @Roles("user")
  @ApiTags('user')
  @ApiParam({ name: 'warehouseId', type: Number })
  async putWerehouse(@Req() req: any, @Body() warehousePutInDto: WerehousePutInDto,  @Param('warehouseId') warehouseId: number): Promise<ResponseDto<WarehouseEntity>> {
    const warehouseEntity: WarehouseEntity = await this.werehouseService.putWarehouse(warehousePutInDto, warehouseId, req.user.id);
  
    const response = new ResponseDtoBuilder<WarehouseEntity>()
    .setStatusCode(200)
    .setMessage("Updated werehouse")
    .setBody(warehouseEntity)
    .build();
  
    return response;
  }

  @Delete("/:warehouseId")
  @Roles("user")
  @ApiTags('user')
  @ApiParam({ name: 'warehouseId', type: Number })
  async deleteWerehouse(@Req() req: any, @Param('warehouseId') warehouseId: number): Promise<ResponseDto<void>> {
    await this.werehouseService.deleteWarehouse(warehouseId, req.user.id);
  
    const response = new ResponseDtoBuilder<void>()
    .setStatusCode(200)
    .setMessage("Deleted werehouse")
    .build();
  
    return response;
  }

  
  @Get("/:warehouseId/record")
  @Roles("user")
  @ApiTags('user')
  @ApiParam({ name: 'warehouseId', type: Number })
  @ApiQuery({ name: 'length', type: Number })
  @ApiQuery({ name: 'offset', type: Number })
  async getData( 
    @Req() req: any, 
    @Param('warehouseId') warehouseId: number,
    @Query('length') length: number,
    @Query('offset') offset: number
    ): Promise<ResponseDto<Array<WarehouseLogsEntity>>> {
    const cstId = req.user.id;
    
    const warehouseLogs: Array<WarehouseLogsEntity> = await this.werehouseService.getWarehouseLogs(warehouseId, cstId, length, offset);
    
    const response = new ResponseDtoBuilder<Array<WarehouseLogsEntity>>()
      .setStatusCode(200)
      .setMessage("Saved data")
      .setBody(warehouseLogs)
      .build();

    return response;
  }

  @Post("record")
  @Roles("iot")
  @ApiTags('iot')
  async postData(@Req() req: any, @Body() werehouseInDto: WerehouseRecordBathInDto): Promise<ResponseDto<void>> {
    const id = req.user.id;

    await this.werehouseService.postData(werehouseInDto, id);
    
    const response = new ResponseDtoBuilder<void>()
      .setStatusCode(200)
      .setMessage("Saved data")
      .build();

    return response;
  }

  @Post("login")
  @ApiTags('anonymous', 'iot')
  async login( @Body() werehouseInDto: WerehouseLoginInDto): Promise<ResponseDto<UserTokenOutDto>> {
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
