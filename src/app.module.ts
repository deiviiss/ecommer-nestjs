import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import { HttpService, HttpModule } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from 'src/users/users.module';
import { ProductModule } from './products/product.module';
import { DatabaseModule } from './database/database.module';

import { enviroments } from 'src/enviroments';
import { AuthModule } from './auth/auth.module';

import config from 'src/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    UserModule,
    ProductModule,
    HttpModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await http.get(
          'https://jsonplaceholder.typicode.com/todos/',
        );

        const data = await (await firstValueFrom(tasks)).data;

        return data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
