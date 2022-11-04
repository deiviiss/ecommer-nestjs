import { Prop, SchemaFactory, Schema, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from 'src/products/entities/brand.entity';
import { Category } from './category.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, type: Number, index: true })
  price: number;

  @Prop({ required: true, type: Number })
  stock: number;

  @Prop({ required: true })
  image: string;

  // relación embebida
  // @Prop(
  //   raw({
  //     name: { type: String },
  //     image: { type: String },
  //   }),
  // )
  // category: Record<string, any>;

  // relación id
  @Prop({ type: Types.ObjectId, ref: Category.name })
  category: Category | Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: Brand.name })
  brand: Brand | Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.index({ price: -1 });
