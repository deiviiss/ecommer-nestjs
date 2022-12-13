import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User } from 'src/users/entities/user.entitys';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';

import * as bcrypt from 'bcrypt';

// import productService
// import { ProductsService } from 'src/products/services/products.service';

// import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    // injection services products (products)
    // private productsService: ProductsService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    const user = this.userModel.findById(id);

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  async create(payload: CreateUserDto) {
    const newUser = await this.userModel.create(payload);

    const hashPassword = await bcrypt.hash(newUser.password, 10);

    newUser.password = hashPassword;

    const model = await newUser.save();

    const { password, ...rta } = model.toJSON();

    return rta;
  }

  async update(id: string, payload: UpdateUserDto) {
    const user = await this.findOne(id);

    if (!user) {
      return false;
    }

    return this.userModel.findByIdAndUpdate(
      id,
      { $set: payload },

      { new: true },
    );
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      return false;
    }

    return this.userModel.findByIdAndDelete(id);
  }

  async getOrdersByUser(id: string) {
    const user = await this.findOne(id);

    return {
      date: new Date(),
      user,
      products: [],
    };
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }
}
