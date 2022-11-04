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

import { CategoriesService } from 'src/products/services/categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategorysDto,
} from 'src/products/dtos/category.dtos';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  @Get('/')
  // swagger
  @ApiOperation({ summary: 'Get all categorys' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getCategorys(@Query() params: FilterCategorysDto) {
    return this.categoryService.findAll(params);
  }

  @Get('/filter')
  // swagger
  @ApiOperation({ summary: 'Get filter categorys' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getCategoryFilter() {
    return `Iam a filter`;
  }

  @Get('/:categoryId')
  getCategory(@Param('categoryId', MongoIdPipe) categoryId: string) {
    return this.categoryService.findOne(categoryId);
  }

  @Post('/')
  //swagger
  @ApiOperation({ summary: 'Create category' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiCreatedResponse({
    description: 'category created',
  })
  @ApiForbiddenResponse()
  createCategory(@Body() payload: CreateCategoryDto) {
    const rta = this.categoryService.create(payload);

    return rta;
  }

  @Patch('/:categoryId')
  updateCategory(
    @Param('categoryId', MongoIdPipe) categoryId: string,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoryService.update(categoryId, payload);
  }

  @Delete('/:categoryId')
  deleteCategory(@Param('categoryId', MongoIdPipe) categoryId: string) {
    return this.categoryService.remove(categoryId);
  }
}
