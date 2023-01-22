import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from 'src/users/entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dtos';
import { Customer } from '../entities/customer.entity';

// import productService
// import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) { }

  async findAll() {
    return this.orderRepo.find();
  }

  findOne(orderId: number) {
    const order = this.orderRepo.findOne({
      where: { orderId },
      relations: ['items', 'items.product'],
    });

    if (!order) {
      throw new NotFoundException(`order ${orderId} not found`);
    }

    return order;
  }

  async create(payload: CreateOrderDto) {
    const order = new Order(); // porque no tenemos más atributos que asignarle

    if (payload.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { customerId: payload.customerId },
      });

      order.customer = customer;
    }

    return this.orderRepo.save(order);
  }

  async update(orderId: number, payload: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { orderId } });

    if (payload.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { customerId: payload.customerId },
      });

      order.customer = customer;
    }

    return this.orderRepo.save(order);
  }

  async remove(orderId: number) {
    const order = await this.findOne(orderId);

    if (!order) {
      return false;
    }

    return this.orderRepo.delete(orderId);
  }
}
