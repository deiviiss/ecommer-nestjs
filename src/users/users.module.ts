import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';

import { CustomerModule } from 'src/customers/customer.module';

@Module({
  imports: [CustomerModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UserModule {}
