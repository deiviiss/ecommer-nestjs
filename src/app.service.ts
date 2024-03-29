import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
// import { Client } from 'pg';

import config from 'src/config';
@Injectable()
export class AppService {
  constructor(
    // @Inject('PG') private clientPg: Client,

    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getTask() {
    console.log('DB driver nativo');

    // new Promise((resolve, reject) => {
    //   this.clientPg.query('SELECT * FROM tasks', (err, res) => {
    //     if (err) {
    //       reject(err);
    //     }
    //     resolve(res.rows);
    //   });
    // });
  }
}
