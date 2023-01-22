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

import { OrdersService } from 'src/users/services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dtos';

@ApiTags('Order')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) { }

  @Get('/')
  @ApiOperation({ summary: 'GET ALL ORDERS' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getOrders() {
    return this.orderService.findAll();
  }

  @Get('/:orderId')
  @ApiOperation({ summary: 'GET ONE ORDER' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.findOne(orderId);
  }

  @Post('/')
  @ApiOperation({ summary: 'CREATE ORDER' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiCreatedResponse({
    description: 'order created',
  })
  @ApiForbiddenResponse()
  createOrder(@Body() payload: CreateOrderDto) {
    const rta = this.orderService.create(payload);

    return rta;
  }

  @Patch('/:orderId')
  @ApiOperation({ summary: 'UPDATE ORDER' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  updateOrder(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(orderId, payload);
  }

  @Delete('/:orderId')
  @ApiOperation({ summary: 'DELETE ORDER' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  deleteOrder(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.orderService.remove(orderId);
  }
}
