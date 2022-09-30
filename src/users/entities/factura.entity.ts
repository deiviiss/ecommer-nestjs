import { Customer } from 'src/customers/entities/customer.entity';
import { User } from './user.entitys';

export class Factura {
  facturaId: number;
  folio: string;
  status: string;
  cantidad: number;
  notes: string;
  rememberAt: Date;
  createAt: Date;
  updateAt: Date;
  user: User;
  customer: Customer[];
}
