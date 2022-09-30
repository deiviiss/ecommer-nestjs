import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Customer } from 'src/customers/entities/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/customers/dtos/customer.dtos';

@Injectable()
export class CustomersService {
  //* provitional (db create id)
  private counterId = 2;

  private customers: Customer[] = [
    {
      // *provitional
      customerId: 1,
      name: 'Armin Enrique',
      lastname: 'Hilera',
      email: 'admin@mail.com',
      direction: 'admin',
      telefono: 9811250049,
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.customerId === id);

    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }

    return customer;
  }

  create(payload: CreateCustomerDto) {
    //* provitional
    this.counterId = this.counterId;

    const newCustomer = {
      customerId: this.counterId,
      ...payload,
    };

    this.customers.push(newCustomer);

    return newCustomer;
  }

  update(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);

    if (customer) {
      const index = this.customers.findIndex((item) => item.customerId === id);
      this.customers[index] = {
        ...customer,
        ...payload,
      };

      return this.customers[index];
    }

    return null;
  }

  remove(id: number) {
    const index = this.customers.findIndex((item) => item.customerId === id);

    if (index === -1) {
      throw new NotFoundException(`Customer ${id} not found`);
    }
    this.customers.splice(index, 1);
    return true;
  }
}
