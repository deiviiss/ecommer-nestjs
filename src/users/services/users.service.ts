import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/users/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';

import * as bcrypt from 'bcrypt';
// import { ProductsService } from 'src/products/services/products.service';
import { CustomersService } from './customers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    // private productService: ProductsService,
    private customerService: CustomersService,
  ) { }

  findAll() {
    return this.userRepo.find({
      relations: ['customer'],
    });
  }

  findOne(userId: number) {
    const user = this.userRepo.findOne({ where: { userId } });

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = await this.userRepo.create(payload);

    if (payload.customerId) {
      const customer = await this.customerService.findOne(payload.customerId);

      newUser.customer = customer;
    }

    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;

    //!eliminar el password del return
    // const { password, ...rta } = model.toJSON();
    // return rta;

    return this.userRepo.save(newUser);
  }

  async update(userId: number, payload: UpdateUserDto) {
    const user = await this.findOne(userId);

    if (!user) {
      return false;
    }

    const userUpdate = this.userRepo.merge(user, payload);

    return this.userRepo.save(userUpdate);
  }

  async remove(userId: number) {
    const user = await this.findOne(userId);

    if (!user) {
      return false;
    }

    return this.userRepo.delete(userId);
  }

  async getOrdersByUser(userId: number) {
    const user = await this.findOne(userId);

    return {
      date: new Date(),
      user,
      products: [],
    };
  }

  // async findByEmail(email: string) {
  //   return await this.userRepo.findOne({ email });
  // }
}
