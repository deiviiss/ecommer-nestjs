import { Factura } from 'src/facturas/entities/factura.entity';
import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import {
  CreateFacturaDto,
  UpdateFacturaDto,
} from 'src/facturas/dtos/factura.dtos';

@Injectable()
export class FacturasService {
  private counterId = 2;

  private facturas: Factura[] = [
    {
      facturaId: 1,
      folio: 'Folio Factura',
      status: 'Open',
      cantidad: 23431,
      notes: 'Por confirmar',
    },
  ];

  findAll() {
    return this.facturas;
  }

  findOne(id: number) {
    const factura = this.facturas.find((item) => item.facturaId === id);

    if (!factura) {
      throw new NotFoundException(`Factura ${id} not found`);
    }

    return factura;
  }

  create(payload: CreateFacturaDto) {
    this.counterId = this.counterId + 1;

    const newFactura = {
      facturaId: this.counterId,
      ...payload,
    };

    this.facturas.push(newFactura);

    return newFactura;
  }

  update(id: number, payload: UpdateFacturaDto) {
    const factura = this.findOne(id);

    if (factura) {
      const index = this.facturas.findIndex((item) => item.facturaId === id);
      this.facturas[index] = {
        ...factura,
        ...payload,
      };

      return this.facturas[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.facturas.findIndex((item) => item.facturaId === id);

    if (index === -1) {
      throw new NotFoundException(`Factura ${id} not found`);
    }
    this.facturas.splice(index, 1);
    return true;
  }
}
