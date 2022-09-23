import { Module } from '@nestjs/common';

import { FacturasController } from './controllers/facturas.controller';
import { FacturasService } from './services/facturas.service';

@Module({
  controllers: [FacturasController],
  providers: [FacturasService],
})
export class FacturaModule {}
