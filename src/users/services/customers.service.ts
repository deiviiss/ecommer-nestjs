import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from 'src/users/entities/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dtos';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) { }

  findAll() {
    return this.customerRepo.find();
  }

  findOne(customerId: number) {
    const customer = this.customerRepo.findOne({ where: { customerId } });

    if (!customer) {
      throw new NotFoundException(`Customer ${customerId} not found`);
    }

    return customer;
  }

  async create(payload: CreateCustomerDto) {
    const newcustomer = await this.customerRepo.create(payload);

    return await this.customerRepo.save(newcustomer);
  }

  async update(customerId: number, payload: UpdateCustomerDto) {
    const customer = await this.findOne(customerId);

    if (!customer) {
      return false;
    }

    const customerUpdate = this.customerRepo.merge(customer, payload);

    return this.customerRepo.save(customerUpdate);
  }

  async remove(customerId: number) {
    const customer = await this.findOne(customerId);

    if (!customer) {
      return false;
    }

    return this.customerRepo.delete(customerId);
  }
}
