import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
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

import { OrderItemService } from '../services/order-item.service';
import {
  CreateOrderItemDto,
  UpdateOrderItemDto,
} from '../dtos/order-item.dtos';

@ApiTags('Order Items')
@Controller('order-item')
export class OrderItemController {
  constructor(private itemService: OrderItemService) { }

  @Get('/')
  @ApiOperation({ summary: 'GET ALL ITEMS' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getItemsOrder() {
    return this.itemService.finAll();
  }

  @Get('/:itemId')
  @ApiOperation({ summary: 'GET ONE ITEM' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getItemOrder(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.itemService.findOne(itemId);
  }

  @Post('/')
  @ApiOperation({ summary: 'CREATE ITEM' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiCreatedResponse({
    description: 'item created',
  })
  @ApiForbiddenResponse()
  createItemOrder(@Body() payload: CreateOrderItemDto) {
    const rta = this.itemService.create(payload);

    return rta;
  }

  @Patch('/:itemId')
  @ApiOperation({ summary: 'UPDATE ITEM' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  updateItemOrder(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() payload: UpdateOrderItemDto,
  ) {
    return this.itemService.update(itemId, payload);
  }

  @Delete('/:itemId')
  @ApiOperation({ summary: 'DELETE ITEM' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  deleteItemOrder(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.itemService.remove(itemId);
  }
}
