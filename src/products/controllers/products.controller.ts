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
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { ProductsService } from 'src/products/services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from 'src/products/dtos/product.dtos';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get('/')
  @Public()
  // swagger
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getProducts(@Query() params: FilterProductsDto) {
    return this.productService.findAll(params);
  }

  @Get('/filter')
  @Public()
  // swagger
  @ApiOperation({ summary: 'Get filter products' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getProductFilter() {
    return `Iam a filter`;
  }

  @Get('/:productId')
  @Public()
  // swagger
  @ApiOperation({ summary: 'Get one product' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productService.findOne(productId);
  }

  @Roles(Role.ADMIN)
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

  @Roles(Role.ADMIN)
  @Patch('/:productId')
  updateProduct(
    @Param('productId', MongoIdPipe) productId: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(productId, payload);
  }

  @Roles(Role.ADMIN)
  @Delete('/:productId')
  deleteProduct(@Param('productId', MongoIdPipe) productId: string) {
    return this.productService.remove(productId);
  }
}
