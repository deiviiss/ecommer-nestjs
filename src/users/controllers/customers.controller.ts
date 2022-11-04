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

import { CustomersService } from 'src/users/services/customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customer.dtos';

@ApiTags('Customer')
@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomersService) {}

  @Get('/')
  // swagger
  @ApiOperation({ summary: 'Get all customer' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getcustomer() {
    return this.customerService.findAll();
  }

  @Get('/:customerId')
  getFactura(@Param('customerId', MongoIdPipe) customerId: string) {
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
  createcustomer(@Body() payload: CreateCustomerDto) {
    const rta = this.customerService.create(payload);

    return rta;
  }

  @Patch('/:customerId')
  updatecustomer(
    @Param('customerId', MongoIdPipe) customerId: string,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customerService.update(customerId, payload);
  }

  @Delete('/:customerId')
  deletecustomer(@Param('customerId', MongoIdPipe) customerId: string) {
    return this.customerService.remove(customerId);
  }
}
