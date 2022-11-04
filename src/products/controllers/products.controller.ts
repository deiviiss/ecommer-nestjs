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
import { ProductsService } from 'src/products/services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/products/dtos/product.dtos';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/')
  // swagger
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productService.findAll(params);
  }

  @Get('/filter')
  // swagger
  @ApiOperation({ summary: 'Get filter products' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getProductFilter() {
    return `Iam a filter`;
  }

  @Get('/:productId')
  getProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productService.findOne(productId);
  }

  @Post('/')
  //swagger
  @ApiOperation({ summary: 'Create product' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
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

  @Patch('/:productId')
  updateProduct(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(productId, payload);
  }

  @Delete('/:productId')
  deleteProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productService.remove(productId);
  }
}
