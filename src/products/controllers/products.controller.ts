import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import {
  ApiTags,
  ApiOperation,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/roles.model';

import { ProductsService } from 'src/products/services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from 'src/products/dtos/product.dtos';

// @UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) { }

  @Get('/')
  // @Public()
  @ApiOperation({ summary: 'GET ALL PRODUCTS' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getProducts(@Query() params: FilterProductDto) {
    return this.productService.findAll(params);
  }

  @Get('/filter')
  // @Public()
  @ApiOperation({ summary: 'GET FILTER PRODUCTS' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getProductFilter() {
    return `Iam a filter`;
  }

  @Get('/:productId')
  @Public()
  @ApiOperation({ summary: 'GET ONE PRODUCT' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findOne(productId);
  }

  // @Roles(Role.ADMIN)
  @Post('/')
  @ApiOperation({ summary: 'CREATE PRODUCT' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiCreatedResponse({
    description: 'product created',
  })
  @ApiForbiddenResponse()
  createProduct(@Body() payload: CreateProductDto) {
    const rta = this.productService.create(payload);
    return rta;
  }

  // @Roles(Role.ADMIN)
  @Patch('/:productId')
  @ApiOperation({ summary: 'UPDATE PRODUCT' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  updateProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(productId, payload);
  }

  // @Roles(Role.ADMIN)
  @Patch('/:productId/category/:categoryId')
  @ApiOperation({ summary: 'ADD CATEGORY TO PRODUCT' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  addCategoryToProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.addCategoryToProduct(productId, categoryId);
  }

  // @Roles(Role.ADMIN)
  @Delete('/:productId')
  @ApiOperation({ summary: 'DELETE PRODUCT' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  deleteProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.remove(productId);
  }

  @Delete('/:productId/category/:categoryId')
  @ApiOperation({ summary: 'DELETE CATEGORY FROM PRODUCT' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  deleteCategoryfromProduct(
    @Param('productId', ParseIntPipe) productId: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.removeCategoryFromProduct(productId, categoryId);
  }
}
