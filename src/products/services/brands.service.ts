import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Brand } from 'src/products/entities/brand.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
  FilterBrandsDto,
} from 'src/products/dtos/brand.dtos';

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async findAll(params?: FilterBrandsDto) {
    if (params) {
      const filters: FilterQuery<Brand> = {};

      const { limit, offset } = params;

      return await this.brandModel
        .find(filters)
        .skip(offset)
        .limit(limit)
        .exec();
    }

    return await this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id).exec();

    if (!brand) {
      throw new NotFoundException(`brand ${id} not found`);
    }

    return brand;
  }

  async create(payload: CreateBrandDto) {
    const newbrand = await this.brandModel.create(payload);

    return await newbrand.save();
  }

  async update(id: string, payload: UpdateBrandDto) {
    const brand = await this.findOne(id);

    if (!brand) {
      return false;
    }

    return this.brandModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
  }

  async remove(id: string) {
    const brand = await this.findOne(id);

    if (!brand) {
      return false;
    }

    return this.brandModel.findByIdAndDelete(id);
  }
}
