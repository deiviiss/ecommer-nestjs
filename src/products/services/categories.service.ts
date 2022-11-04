import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Category } from 'src/products/entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategorysDto,
} from 'src/products/dtos/category.dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAll(params?: FilterCategorysDto) {
    if (params) {
      const filters: FilterQuery<Category> = {};

      const { limit, offset } = params;

      return await this.categoryModel
        .find(filters)
        .skip(offset)
        .limit(limit)
        .exec();
    }

    return await this.categoryModel.find().exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();

    if (!category) {
      throw new NotFoundException(`category ${id} not found`);
    }

    return category;
  }

  async create(payload: CreateCategoryDto) {
    const newcategory = await this.categoryModel.create(payload);

    return await newcategory.save();
  }

  async update(id: string, payload: UpdateCategoryDto) {
    const category = await this.findOne(id);

    if (!category) {
      return false;
    }

    return this.categoryModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    if (!category) {
      return false;
    }

    return this.categoryModel.findByIdAndDelete(id);
  }
}
