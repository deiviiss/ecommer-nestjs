import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Order } from 'src/users/entities/order.entitys';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dtos';

// import productService
// import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class OrdersService {
  constructor(
    // injection services products (products)
    // private productsService: ProductsService,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  findAll() {
    return this.orderModel.find().populate('customer').populate('products');
  }

  findOne(id: string) {
    const order = this.orderModel.findById(id);

    if (!order) {
      throw new NotFoundException(`order ${id} not found`);
    }

    return order;
  }

  async create(payload: CreateOrderDto) {
    const neworder = await this.orderModel.create(payload);

    return await neworder.save();
  }

  async update(id: string, payload: UpdateOrderDto) {
    const order = await this.findOne(id);

    if (!order) {
      return false;
    }

    return this.orderModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    if (!order) {
      return false;
    }

    return this.orderModel.findByIdAndDelete(id);
  }
}
