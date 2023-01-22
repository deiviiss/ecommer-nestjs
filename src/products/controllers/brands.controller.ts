import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  Query,
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

import { BrandsService } from 'src/products/services/brands.service';
import {
  CreateBrandDto,
  UpdateBrandDto,
  FilterBrandDto,
} from 'src/products/dtos/brand.dtos';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) { }

  @Get('/')
  @ApiOperation({ summary: 'GET ALL BRANDS' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getBrands(@Query() params: FilterBrandDto) {
    return this.brandService.findAll(params);
  }

  @Get('/filter')
  @ApiOperation({ summary: 'GET FILTER BRANDS' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getBrandFilter() {
    return `Iam a filter`;
  }

  @Get('/:brandId')
  @ApiOperation({ summary: 'GET ONE BRAND' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getBrand(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandService.findOne(brandId);
  }

  @Post('/')
  @ApiOperation({ summary: 'CREATE BRAND' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiCreatedResponse({
    description: 'brand created',
  })
  @ApiForbiddenResponse()
  createBrand(@Body() payload: CreateBrandDto) {
    const rta = this.brandService.create(payload);

    return rta;
  }

  @Patch('/:brandId')
  @ApiOperation({ summary: 'UPDATE BRAND' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  updateBrand(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.update(brandId, payload);
  }

  @Delete('/:brandId')
  @ApiOperation({ summary: 'DELETE BRAND' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  deleteBrand(@Param('brandId', ParseIntPipe) brandId: number) {
    return this.brandService.remove(brandId);
  }
}
