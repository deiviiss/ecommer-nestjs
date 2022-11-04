import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Product } from '../../products/entities/product.entity';
import { Customer } from '../../users/entities/customer.entitys';

@Schema()
export class Order extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: Customer.name })
  customer: Customer | Types.ObjectId; // relation 1:1 customer

  @Prop({ required: true, type: [{ type: Types.ObjectId, ref: Product.name }] })
  products: Types.Array<Product>; // relation 1:N products
}

export const OrderSchema = SchemaFactory.createForClass(Order);
