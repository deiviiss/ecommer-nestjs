import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { CustomersService } from 'src/customers/services/customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/customers/dtos/customer.dtos';

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

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get('/')
  // swagger
  @ApiOperation({ summary: 'Get all customers' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getCustomers() {
    return this.customerService.findAll();
  }

  @Get('/:customerId')
  getCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customerService.findOne(customerId);
  }

  @Post('/')
  //swagger
  @ApiOperation({ summary: 'Create customer' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
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
  updateCustomer(
    @Param('customerId', ParseIntPipe) customerId: number,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customerService.update(customerId, payload);
  }

  @Delete('/:customerId')
  deleteCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customerService.remove(customerId);
  }
}
