import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { User } from 'src/users/entities/user.entitys';
import { Factura } from 'src/users/entities/factura.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';

import { CustomersService } from 'src/customers/services/customers.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  // injection services customers (products)
  constructor(
    private customersService: CustomersService,
    private configService: ConfigService, // injectar como module global // @Inject('API_KEY') private apiKey: string,
  ) {}

  private counterId = 2;

  private users: User[] = [
    {
      userId: 1,
      name: 'Armin Enrique',
      email: 'admin@mail.com',
      role: 'admin',
      createAt: new Date(),
      updateAt: new Date(),
    },
  ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    console.log('apikey');

    console.log(apiKey);

    return this.users;
  }

  findOne(id: number) {
    console.log(this.users);

    const user = this.users.find((item) => item.userId === id);
    console.log(user);

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  create(payload: CreateUserDto) {
    this.counterId = this.counterId + 1;

    //* provisional
    const newUser = {
      userId: this.counterId,
      createAt: new Date(),
      updateAt: new Date(),
      ...payload,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, payload: UpdateUserDto) {
    const user = this.findOne(id);

    if (user) {
      const index = this.users.findIndex((item) => item.userId === id);
      this.users[index] = {
        ...user,
        ...payload,
      };

      return this.users[index];
    }

    return null;
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.userId === id);

    if (index === -1) {
      throw new NotFoundException(`User ${id} not found`);
    }
    this.users.splice(index, 1);
    return true;
  }

  getFacturaByUser(id: number): Factura {
    const user = this.findOne(id);

    return {
      facturaId: 4,
      folio: 'F-123',
      status: 'Cobrado',
      cantidad: 28899,
      notes: 'Factura en memoria',
      rememberAt: new Date(),
      createAt: new Date(),
      updateAt: new Date(),
      user,
      customer: this.customersService.findAll(), // id provisional
    };
  }
}
