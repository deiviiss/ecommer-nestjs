import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User, UserSchema } from './entities/user.entitys';

import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer, CustomerSchema } from './entities/customer.entitys';

import { ProductModule } from 'src/products/product.module';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Order, OrderSchema } from './entities/order.entitys';

@Module({
  imports: [
    ProductModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
  ],
  controllers: [UsersController, CustomerController, OrdersController],
  providers: [UsersService, CustomersService, OrdersService],
  exports: [UsersService],
})
export class UserModule {}
