import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
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

import { OrdersService } from 'src/users/services/orders.service';
import { CreateOrderDto, UpdateOrderDto } from 'src/users/dtos/order.dtos';

@ApiTags('Order')
@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get('/')
  // swagger
  @ApiOperation({ summary: 'Get all order' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getorder() {
    return this.orderService.findAll();
  }

  @Get('/:orderId')
  getFactura(@Param('orderId', MongoIdPipe) orderId: string) {
    return this.orderService.findOne(orderId);
  }

  @Post('/')
  //swagger
  @ApiOperation({ summary: 'Create order' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiCreatedResponse({
    description: 'order created',
  })
  @ApiForbiddenResponse()
  createorder(@Body() payload: CreateOrderDto) {
    const rta = this.orderService.create(payload);

    return rta;
  }

  @Patch('/:orderId')
  updateorder(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.orderService.update(orderId, payload);
  }

  @Delete('/:orderId')
  deleteorder(@Param('orderId', MongoIdPipe) orderId: string) {
    return this.orderService.remove(orderId);
  }
}
