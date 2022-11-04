import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Db } from 'mongodb';

import config from 'src/config';
@Injectable()
export class AppService {
  constructor(
    // inject from enviroment
    // @Inject('API_KEY') private apiKey: string,
    // inject from useFactory
    @Inject('TASKS') private tasks: any[],
    // inject from useFactory
    @Inject('MONGO') private database: Db,
    // inject from config
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getHello(): string {
    const apiKey = this.configService.apiKey;
    return `Hello World! ${apiKey}`;
  }

  getTask() {
    const taskCollection = this.database.collection('tasks');
    return taskCollection.find().toArray();
  }
}
