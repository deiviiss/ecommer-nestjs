import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { FacturasService } from 'src/facturas/services/facturas.service';
import {
  CreateFacturaDto,
  UpdateFacturaDto,
} from 'src/facturas/dtos/factura.dtos';

@Controller('facturas')
export class FacturasController {
  constructor(private facturaService: FacturasService) {}

  @Get('/')
  getFacturas() {
    return this.facturaService.findAll();
  }

  // @Get('/filter')
  // getProductFilter() {
  //   return {
  //     message: `yo soy un filter`,
  //   };
  // }

  @Get('/:facturaId')
  getFactura(@Param('facturaId', ParseIntPipe) facturaId: number) {
    return this.facturaService.findOne(facturaId);
  }

  @Post('/')
  createFactura(@Body() payload: CreateFacturaDto) {
    const rta = this.facturaService.create(payload);

    return rta;
  }

  @Patch('/:facturaId')
  updateFactura(
    @Param('facturaId', ParseIntPipe) facturaId: number,
    @Body() payload: UpdateFacturaDto,
  ) {
    return this.facturaService.update(facturaId, payload);
  }

  @Delete('/:facturaId')
  deleteFactura(@Param('facturaId', ParseIntPipe) facturaId: number) {
    return this.facturaService.remove(facturaId);
  }
}
