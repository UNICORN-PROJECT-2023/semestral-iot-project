import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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


@Injectable()
export class WerehouseService {

  constructor(
    @Inject(CustomerDao)
    private customerDao: CustomerDao,
    @Inject(JwtService)
    private jwtService: JwtService,
    @Inject(PasswordService)
    private passwordService: PasswordService,
  ) {}

  async postData(werehouseInDto: WerehouseRecordInDto): Promise<void> {
  
  }
  

  async register(werehouseInDto: WerehouseRegisterInDto): Promise<UserTokenOutDto> {
    // userInDto.password = await this.passwordService.hashPassword(userInDto.password);
    // const customerEntity: CustomerEntity = await this.customerDao.add(userInDto);
    // const jwtToken = this.jwtService.generateToken(customerEntity.id, customerEntity.email, ["user"]);

    const jwtToken = this.jwtService.generateToken(1, "", ["iot"]);
    return new UserTokenOutDto(jwtToken);
  }


  async login(werehouseInDto: WerehouseRegisterInDto): Promise<UserTokenOutDto> {
    // const customerEntity: CustomerEntity = await this.customerDao.findByEmail(userInDto.email);
    
    // if(!customerEntity)  {
    //   throw new BadRequestException("Wrong email or password");
    // }

    // const isEqual: boolean = await this.passwordService.comparePassword(userInDto.password, customerEntity.password);
    
    // if(!isEqual)  {
    //   throw new BadRequestException("Wrong email or password");
    // }

    // const jwtToken = this.jwtService.generateToken(customerEntity.id, customerEntity.email, ["user"]);

    const jwtToken = this.jwtService.generateToken(1, "", ["iot"]);
    return new UserTokenOutDto(jwtToken);
  }
}


