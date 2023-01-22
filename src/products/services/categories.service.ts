import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { Category } from 'src/products/entities/category.entity';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto,
  //! cambiando tablas a singular y agregando los filterDTO
} from 'src/products/dtos/category.dtos';
import { take } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll(params?: FilterCategoryDto) {
    if (params) {
      const where: FindOptionsWhere<Category> = {};
      const { limit, offset } = params;

      return await this.categoryRepo.find({
        where,
        take: limit,
        skip: offset,
      });
    }

    return await this.categoryRepo.find();
  }

  async findOne(categoryId: number) {
    const category = await this.categoryRepo.findOne({
      where: { categoryId },
      relations: ['products'],
    });

    if (!category) {
      throw new NotFoundException(`category ${categoryId} not found`);
    }

    return category;
  }

  async create(payload: CreateCategoryDto) {
    const newcategory = await this.categoryRepo.create(payload);

    return await this.categoryRepo.save(newcategory);
  }

  async update(categoryId: number, payload: UpdateCategoryDto) {
    const category = await this.findOne(categoryId);

    const categoryUpdate = this.categoryRepo.merge(category, payload);

    return this.categoryRepo.save(categoryUpdate);
  }

  async remove(categoryId: number) {
    await this.findOne(categoryId);
    return this.categoryRepo.delete(categoryId);
  }
}
