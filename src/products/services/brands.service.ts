import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';

import { Brand } from 'src/products/entities/brand.entity';
import {
  CreateBrandDto,
  UpdateBrandDto,
  FilterBrandDto,
} from 'src/products/dtos/brand.dtos';

@Injectable()
export class BrandsService {
  constructor(@InjectRepository(Brand) private brandRepo: Repository<Brand>) {}

  async findAll(params?: FilterBrandDto) {
    if (params) {
      //? para poder filtrar por cualquier propiedad
      // where.name
      const where: FindOptionsWhere<Brand> = {};
      const { limit, offset } = params;

      return await this.brandRepo.find({
        where,
        take: limit,
        skip: offset,
      });
    }

    return await this.brandRepo.find();
  }

  async findOne(brandId: number) {
    const brand = await this.brandRepo.findOne({
      where: { brandId },
      relations: ['products'],
    });

    if (!brand) {
      throw new NotFoundException(`brand ${brandId} not found`);
    }

    return brand;
  }

  async create(payload: CreateBrandDto) {
    const newbrand = await this.brandRepo.create(payload);

    return await this.brandRepo.save(newbrand);
  }

  async update(brandId: number, payload: UpdateBrandDto) {
    const brand = await this.findOne(brandId);

    const brandUpdate = this.brandRepo.merge(brand, payload);

    return this.brandRepo.save(brandUpdate);
  }

  async remove(brandId: number) {
    await this.findOne(brandId);
    return this.brandRepo.delete(brandId);
  }
}
