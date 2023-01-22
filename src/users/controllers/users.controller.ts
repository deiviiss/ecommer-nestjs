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

import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get('/')
  @ApiOperation({ summary: 'GET ALL USERS' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getUsers() {
    return this.userService.findAll();
  }

  @Get('/:userId')
  @ApiOperation({ summary: 'GET ONE USER' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.findOne(userId);
  }

  @Post('/')
  @ApiOperation({ summary: 'CREATE USER' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  @ApiCreatedResponse({
    description: 'user created',
  })
  @ApiForbiddenResponse()
  createUser(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Patch('/:userId')
  @ApiOperation({ summary: 'UPDATE USER' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(userId, payload);
  }

  @Delete('/:userId')
  @ApiOperation({ summary: 'DELETE USER' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiUnauthorizedResponse({
    description: 'Not Authorized',
  })
  @ApiNotFoundResponse({ description: 'Not found response' })
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.userService.remove(userId);
  }
}
