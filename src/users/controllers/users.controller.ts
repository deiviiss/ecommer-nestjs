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

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getUsers() {
    return this.userService.findAll();
  }

  @Get('/:userId')
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Get('/:userId/facturas')
  getOrders(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.getFacturaByUser(userId);
  }

  @Post('/')
  //swagger
  @ApiOperation({ summary: 'Create user' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @ApiCreatedResponse({
    description: 'User created',
  })
  @ApiForbiddenResponse({
    description: 'Forbidden',
  })
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
