import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  Query,
  // UseGuards,
} from '@nestjs/common';
// import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
// import { Public } from 'src/auth/decorators/public.decorator';
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
import { ParseIntPipe } from 'src/common/parse-int.pipe';

import { CategoriesService } from 'src/products/services/categories.service';
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  FilterCategoryDto,
} from 'src/products/dtos/category.dtos';

@ApiTags('Categories')
// @UseGuards(ApiKeyGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) { }

  // @Public()
  @Get('/')
  @ApiOperation({ summary: 'GET ALL CATEGORIES' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getCategories(@Query() params: FilterCategoryDto) {
    return this.categoryService.findAll(params);
  }

  @Get('/filter')
  @ApiOperation({ summary: 'GET FILTER CATEGORIES' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getCategoriesFilter() {
    return `Iam a filter`;
  }

  @Get('/:categoryId')
  @ApiOperation({ summary: 'GET ONE CATEGORY' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.findOne(categoryId);
  }

  @Post('/')
  @ApiOperation({ summary: 'CREATE CATEGORY' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
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
  @ApiOperation({ summary: 'UPDATE CATEGORY' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() payload: UpdateCategoryDto,
  ) {
    return this.categoryService.update(categoryId, payload);
  }

  @Delete('/:categoryId')
  @ApiOperation({ summary: 'DELETE CATEGORY' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number) {
    return this.categoryService.remove(categoryId);
  }
}
