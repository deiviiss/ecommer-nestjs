import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
// import { MongoClient } from 'mongodb';

import config from 'src/config';
const API_KEY = 'API_KEY dev';
const API_KEY_PROD = 'API_KEY prod';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbName, user, password, port, host, connection } =
          configService.mongo;

        return {
          uri: `${connection}://${host}:${port}`,
          user,
          pass: password,
          dbName,
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbName, user, password, port, host, connection } =
          configService.mongo;

        return {
          uri: `${connection}://${user}:${password}@${host}:${port}`,
          user,
          password,
          host,
          port,
          dbName,
        };
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'MONGO', MongooseModule],
})
export class DatabaseModule {}
