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
import { CustomersService } from 'src/users/services/customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dtos';

@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}

  @Get('/')
  getCustomers() {
    return this.customerService.findAll();
  }

  @Get('/:customerId')
  getCustomer(@Param('customerId', ParseIntPipe) customerId: number) {
    return this.customerService.findOne(customerId);
  }

  @Post('/')
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
