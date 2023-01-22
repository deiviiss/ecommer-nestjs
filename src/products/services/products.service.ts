import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, Between, FindOptionsWhere } from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { Category } from 'src/products/entities/category.entity';
import { Brand } from '../entities/brand.entity';

import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from 'src/products/dtos/product.dtos';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll(params?: FilterProductDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { maxPrice, minPrice } = params;

      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }

      return await this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }

    return await this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(productId: number) {
    const product = await this.productRepo.findOne({
      where: { productId },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`product ${productId} not found`);
    }
    return product;
  }

  async create(payload: CreateProductDto) {
    const newProduct = this.productRepo.create(payload);

    if (payload.brandId) {
      const brandId = payload.brandId;
      const brand = await this.brandRepo.findOne({ where: { brandId } });

      newProduct.brand = brand;
    }

    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        categoryId: In(payload.categoriesIds),
      });

      newProduct.categories = categories;
    }

    return this.productRepo.save(newProduct);
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.findOne(id);

    if (payload.brandId) {
      const brandId = payload.brandId;
      const brand = await this.brandRepo.findOne({ where: { brandId } });

      product.brand = brand;
    }

    if (payload.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        categoryId: In(payload.categoriesIds),
      });

      product.categories = categories;
    }

    const productUpdate = this.productRepo.merge(product, payload);

    return this.productRepo.save(productUpdate);
  }

  async removeCategoryFromProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { productId },
      relations: ['categories'],
    });

    if (!product) {
      throw new NotFoundException(`product ${productId} not found`);
    }

    product.categories = product.categories.filter(
      (item) => item.categoryId !== categoryId,
    );

    return this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { productId },
      relations: ['categories'],
    });

    if (!product) {
      throw new NotFoundException(`product ${productId} not found`);
    }

    // validaciones de si existe la categoria
    const category = await this.categoryRepo.findOne({ where: { categoryId } });

    if (!category) {
      throw new NotFoundException(`category ${categoryId} not found`);
    }

    const existCategory = product.categories.find(
      (item) => item.categoryId == categoryId,
    );

    if (existCategory) {
      throw new NotFoundException(
        `category ${categoryId} is already present in this product`,
      );
    }

    product.categories.push(category);

    return this.productRepo.save(product);
  }

  async remove(id: number) {
    return this.productRepo.delete(id);
  }
}
