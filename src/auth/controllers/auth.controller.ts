import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import {
  ApiTags,
  ApiOperation,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import { User } from 'src/users/entities/user.entitys';

@ApiTags('Login')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiOkResponse({ description: 'Response Ok' })
  @ApiNotFoundResponse({ description: 'Not found response' })
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }
}
