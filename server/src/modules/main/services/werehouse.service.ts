import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import passport from 'passport';
import { CustomerDao } from 'src/modules/database/dao/customer.dao';
import { CustomerEntity } from 'src/modules/database/entity/customer.entity';
import { UserLoginInDto } from '../dto/user-login-in.dto';
import { UserRegisterInDto } from '../dto/user-register-in.dto';
import { UserTokenOutDto } from '../dto/user-token-out.dto';
import { PasswordService } from './password.service';
import { JwtService } from 'src/modules/guard/service/jwt.service';
import { UserPutInDto } from '../dto/user-put-in.dto';
import { WerehouseRegisterInDto } from '../dto/werehouse-register-in.dto';
import { WerehouseRecordInDto } from '../dto/werehouse-record-in.dto';
import { WarehouseDao } from 'src/modules/database/dao/warehouse.dao';
import { WarehouseEntity } from 'src/modules/database/entity/warehouse.entity';
import { WarehouseLogsTransformer } from '../transformer/warehouse-logs.transformer';
import { WarehouseLogsDao } from 'src/modules/database/dao/warehouseLogs.dao';
import { In } from 'typeorm';
import { CustomerWarehouseDao } from 'src/modules/database/dao/customer-warehouse.dao';
import { WerehouseInDto } from '../dto/werehouse-in.dto';
import { CustomerWarehouseEntity } from 'src/modules/database/entity/customer-warehouse.entity';
import { WerehousePutInDto } from '../dto/werehouse-put-in.dto';
import { WarehouseLogsEntity } from 'src/modules/database/entity/warehouse-logs.entity';
import { WerehouseLoginInDto } from '../dto/werehouse-login-in.dto';


@Injectable()
export class WerehouseService {

  constructor(
    @Inject(CustomerDao)
    private customerDao: CustomerDao,
    @Inject(WarehouseDao)
    private warehouseDao: WarehouseDao,
    @Inject(WarehouseLogsDao)
    private warehouseLogsDao: WarehouseLogsDao,
    @Inject(CustomerWarehouseDao)
    private customerWarehouseDao: CustomerWarehouseDao,
    @Inject(JwtService)
    private jwtService: JwtService,
    @Inject(PasswordService)
    private passwordService: PasswordService,
  ) {}

  /** IOT FUNCTIONS */

  async postData(werehouseInDto: WerehouseRecordInDto, id: number): Promise<void> {
    const warehouseEntity = await this.warehouseDao.findById(id);

    const warehouseLogsEntity = WarehouseLogsTransformer.dtoToEntity(werehouseInDto, warehouseEntity);

    await this.warehouseLogsDao.add(warehouseLogsEntity);
  }
  

  async register(werehouseInDto: WerehouseRegisterInDto): Promise<UserTokenOutDto> {
    if(werehouseInDto.secretKey != process.env.SECRET_KEY) {
      throw new ForbiddenException("Wrong secret key");
    }

    const werehouseEntity = await this.warehouseDao.findByWarehouseId(werehouseInDto.id);

    if(werehouseEntity) {
      throw new BadRequestException("Warehouse already exists");
    }

    werehouseInDto.password = await this.passwordService.hashPassword(werehouseInDto.password);

    const warehouseEntity: WarehouseEntity = new WarehouseEntity(
      werehouseInDto.id, 
      werehouseInDto.password,
      -100,
      100,
      10
    );

    const createdWarehouseEntity: WarehouseEntity = await this.warehouseDao.add(warehouseEntity);
    const jwtToken = this.jwtService.generateToken(createdWarehouseEntity.id, createdWarehouseEntity.warehouseId, ["iot"]);

    return new UserTokenOutDto(jwtToken);
  }


  async login(warehouseInDto: WerehouseLoginInDto): Promise<UserTokenOutDto> {
    const warehouseEntity: WarehouseEntity = await this.warehouseDao.findByWarehouseId(warehouseInDto.id);
    
    if(!warehouseEntity)  {
      throw new BadRequestException("Wrong warehouseId or password");
    }

    const isEqual: boolean = await this.passwordService.comparePassword(warehouseInDto.password, warehouseEntity.password);
    
    if(!isEqual)  {
      throw new BadRequestException("Wrong warehouseId or password");
    }

    const jwtToken = this.jwtService.generateToken(warehouseEntity.id, warehouseEntity.warehouseId, ["iot"]);

    return new UserTokenOutDto(jwtToken);
  }

    /** CUSTOMER FUNCTIONS */

    async addNewWarehouse(warehouseInDto: WerehouseInDto, userId: number,): Promise<WarehouseEntity> {
      await this.customerWarehouseDao.add(warehouseInDto.iotId, userId);

      const warehouseEntity = await this.warehouseDao.findByWarehouseId(warehouseInDto.iotId);

      warehouseEntity.allertMinDuration = warehouseInDto.alertDuration
      warehouseEntity.temperatureMin = warehouseInDto.minTemperature
      warehouseEntity.temperatureMax = warehouseInDto.maxTemperature

      await this.warehouseDao.put(warehouseEntity, warehouseEntity.id);
      
      return warehouseEntity;
    }

    async putWarehouse(warehouseInDto: WerehousePutInDto, warehouseId: number, userId: number): Promise<WarehouseEntity> {
      const warehouseEntity = await this.warehouseDao.findById(warehouseId);

      if(warehouseEntity.customerWarehouseEntity.find((customer) => customer.customerEntity.id != userId)) {
        throw new ForbiddenException("You are not the owner of this warehouse");
      }

      warehouseEntity.allertMinDuration = warehouseInDto.alertDuration
      warehouseEntity.temperatureMin = warehouseInDto.minTemperature
      warehouseEntity.temperatureMax = warehouseInDto.maxTemperature

      await this.warehouseDao.put(warehouseEntity, warehouseEntity.id);
    

      return warehouseEntity;
    }

    async deleteWarehouse(warehouseId: number, userId: number): Promise<void> {
      await this.customerWarehouseDao.delete(warehouseId, userId);
    }

    async getUserWerehouses(userId: number): Promise<Array<WarehouseEntity>> {
      const WarehouseEntites: Array<WarehouseEntity> = await this.warehouseDao.findAllByCustomerId(userId);

      return WarehouseEntites;
    }

    async getWarehouseLogs(warehouseId: number, userId: number, length: number, offset: number): Promise<Array<WarehouseLogsEntity>> {
      const warehouseEntity = await this.warehouseDao.findById(warehouseId);

      if(warehouseEntity.customerWarehouseEntity.find((customer) => customer.customerEntity.id != userId)) {
        throw new ForbiddenException("You are not the owner of this warehouse");
      }

      const warehouseLogsEntityArray = await this.warehouseLogsDao.findAllByWarehouseId(warehouseId, length, offset);

      return warehouseLogsEntityArray;
    }
}


