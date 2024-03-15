import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRegisterInDto } from 'src/modules/main/dto/user-register-in.dto';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entity/customer.entity';

@Injectable()
export class CustomerDao {
  constructor(
    @InjectRepository(CustomerEntity)
    private usersRepository: Repository<CustomerEntity>,
  ) {}

  async findAll(): Promise<CustomerEntity[]> {
    return this.usersRepository.find();
  }

  async findById(id: number): Promise<CustomerEntity> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<CustomerEntity> {
    return this.usersRepository.findOneBy({ email });
  }

  async add(userInDto: UserRegisterInDto): Promise<CustomerEntity> {
    // validate if email is available
    if(await this.findByEmail(userInDto.email)) {
      throw new ConflictException("Email Already taken");
    }

    const customer = new CustomerEntity(
      userInDto.email, 
      userInDto.username, 
      userInDto.password,
    );

    return await this.usersRepository.save(customer);
  }

  async put(customerEntity: CustomerEntity): Promise<CustomerEntity> {
    const tempCustomerEntity = await this.usersRepository.findOneBy({ id: customerEntity.id });
    const changedCustomerEntity = {...tempCustomerEntity, ...customerEntity};

    // validate if email is available
    if(customerEntity.email != tempCustomerEntity.email && await this.findByEmail(customerEntity.email)) {
      throw new ConflictException("Email Already taken");
    }

    await this.usersRepository.save(changedCustomerEntity);

    return changedCustomerEntity;
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}