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
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

import { BrandsService } from 'src/products/services/brands.service';
import {
  CreateBrandDto,
  UpdateBrandDto,
  FilterBrandsDto,
} from 'src/products/dtos/brand.dtos';

@ApiTags('Brands')
@Controller('brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get('/')
  // swagger
  @ApiOperation({ summary: 'Get all brands' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getproducts(@Query() params: FilterBrandsDto) {
    return this.brandService.findAll(params);
  }

  @Get('/filter')
  // swagger
  @ApiOperation({ summary: 'Get filter brands' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getbrandFilter() {
    return `Iam a filter`;
  }

  @Get('/:brandId')
  getbrand(@Param('brandId', MongoIdPipe) brandId: string) {
    return this.brandService.findOne(brandId);
  }

  @Post('/')
  //swagger
  @ApiOperation({ summary: 'brand product' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
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
  updateBrand(
    @Param('brandId', MongoIdPipe) brandId: string,
    @Body() payload: UpdateBrandDto,
  ) {
    return this.brandService.update(brandId, payload);
  }

  @Delete('/:brandId')
  deleteBrand(@Param('brandId', MongoIdPipe) brandId: string) {
    return this.brandService.remove(brandId);
  }
}
