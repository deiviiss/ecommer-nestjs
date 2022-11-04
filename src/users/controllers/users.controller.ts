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

import { UsersService } from 'src/users/services/users.service';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/')
  // swagger
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  getUser() {
    return this.userService.findAll();
  }

  @Get('/:userId')
  getFactura(@Param('userId', MongoIdPipe) userId: string) {
    return this.userService.findOne(userId);
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
  @ApiForbiddenResponse()
  createUser(@Body() payload: CreateUserDto) {
    const rta = this.userService.create(payload);

    return rta;
  }

  @Patch('/:userId')
  updateUser(
    @Param('userId', MongoIdPipe) userId: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.userService.update(userId, payload);
  }

  @Delete('/:userId')
  deleteUser(@Param('userId', MongoIdPipe) userId: string) {
    return this.userService.remove(userId);
  }
}
