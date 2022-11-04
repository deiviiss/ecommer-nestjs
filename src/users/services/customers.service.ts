import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Customer } from 'src/users/entities/customer.entitys';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dtos';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}

  findAll() {
    return this.customerModel.find();
  }

  findOne(id: string) {
    const customer = this.customerModel.findById(id);

    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }

    return customer;
  }

  async create(payload: CreateCustomerDto) {
    const newcustomer = await this.customerModel.create(payload);

    return await newcustomer.save();
  }

  async update(id: string, payload: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    if (!customer) {
      return false;
    }

    return this.customerModel.findByIdAndUpdate(
      id,
      { $set: payload },

      { new: true },
    );
  }

  async remove(id: string) {
    const customer = await this.findOne(id);

    if (!customer) {
      return false;
    }

    return this.customerModel.findByIdAndDelete(id);
  }
}
