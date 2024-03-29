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

import { CustomersService } from 'src/users/services/customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dtos';

@ApiTags('Customer')
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomersService) { }

  @Get('/')
  @ApiOperation({ summary: 'GET ALL CUSTOMERS' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getCustomers() {
    return this.customerService.findAll();
  }

  @Get('/:customerId')
  @ApiOperation({ summary: 'GET ONE CUSTOMER' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customerService.findOne(customerId);
  }

  @Post('/')
  @ApiOperation({ summary: 'CREATE CUSTOMER' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiCreatedResponse({
    description: 'Customer created',
  })
  @ApiForbiddenResponse()
  createCustomer(@Body() payload: CreateCustomerDto) {
    const rta = this.customerService.create(payload);

    return rta;
  }

  @Patch('/:customerId')
  @ApiOperation({ summary: 'UPDATE CUSTOMER' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  updateCustomer(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customerService.update(customerId, payload);
  }

  @Delete('/:customerId')
  @ApiOperation({ summary: 'DELETE CUSTOMER' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  deletecustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customerService.remove(customerId);
  }
}
