import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { ApiTags } from '@nestjs/swagger';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get()
  @Get('/tasks')
  getTasks() {
    return this.appService.getTask();
  }
}
