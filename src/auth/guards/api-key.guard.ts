import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigType } from '@nestjs/config';
import { Observable } from 'rxjs';

import { Request } from 'express';

import config from '../../config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    // console.log(isPublic);

    if (isPublic) {
      return true;
    }
    // get headers
    const request = context.switchToHttp().getRequest<Request>();

    const authHeader = request.header('AUTH');
    // console.log(authHeader);

    const isAuth = authHeader === this.configService.apiKey;

    if (!isAuth) {
      throw new UnauthorizedException('Not allow');
    }

    return true;
  }
}
