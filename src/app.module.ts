import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FacturaModule } from './facturas/facturas.module';
import { UserModule } from 'src/users/users.module';

@Module({
  imports: [FacturaModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
