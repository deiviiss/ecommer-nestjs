import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Product } from 'src/products/entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/products/dtos/product.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};

      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;

      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }

      return await this.productModel
        .find(filters)
        // .populate(['brand', 'category'])
        .skip(offset)
        .limit(limit)
        .exec();
    }

    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate(['brand', 'category'])
      .exec();

    if (!product) {
      throw new NotFoundException(`product ${id} not found`);
    }

    return product;
  }

  async create(payload: CreateProductDto) {
    const newproduct = await this.productModel.create(payload);

    return await newproduct.save();
  }

  async update(id: string, payload: UpdateProductDto) {
    const product = await this.findOne(id);

    if (!product) {
      return false;
    }

    return this.productModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    if (!product) {
      return false;
    }

    return this.productModel.findByIdAndDelete(id);
  }
}
