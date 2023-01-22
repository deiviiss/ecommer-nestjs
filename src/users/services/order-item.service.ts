import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from './../entities/order.entity';
import { OrderItem } from './../entities/order-item.entity';
import { Product } from './../../products/entities/product.entity';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from './../dtos/order-item.dtos';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private itemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) { }

  finAll() {
    return this.itemRepo.find({ relations: ['order', 'order.customer'] });
  }

  findOne(itemId: number) {
    const item = this.itemRepo.findOne({ where: { itemId } });

    if (!item) {
      throw new NotFoundException(`Item ${itemId} not found`);
    }

    return item;
  }

  async create(payload: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne({
      where: { orderId: payload.orderId },
    });
    if (!order) {
      throw new NotFoundException(`order ${payload.orderId} not found`);
    }
    const product = await this.productRepo.findOne({
      where: { productId: payload.productId },
    });
    if (!product) {
      throw new NotFoundException(`product ${payload.productId} not found`);
    }

    const existingItem = await this.itemRepo.findOne({
      where: {
        product: { productId: product.productId },
        order: { orderId: order.orderId },
      },
    });

    if (existingItem) {
      existingItem.quantity += payload.quantity;
      return this.itemRepo.save(existingItem);
    } else {
      const item = new OrderItem();

      item.order = order;
      item.product = product;
      item.quantity = payload.quantity;

      return this.itemRepo.save(item);
    }
  }

  async update(itemId: number, payload: UpdateOrderItemDto) {
    const item = await this.findOne(itemId);

    const itemUpdate = this.itemRepo.merge(item, payload);

    return this.itemRepo.save(itemUpdate);
  }

  async remove(itemId: number) {
    this.findOne(itemId);

    return this.itemRepo.delete(itemId);
  }
}
