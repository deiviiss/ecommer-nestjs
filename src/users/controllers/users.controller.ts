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
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  getUsers() {
    return this.userService.findAll();
  }

  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Post('/')
  createUser(@Body() payload: CreateUserDto) {
    const rta = this.userService.create(payload);

    return rta;
  }

  @Patch('/:userId')
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(userId, payload);
  }

  @Delete('/:userId')
  deleteFactura(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.remove(userId);
  }
}
