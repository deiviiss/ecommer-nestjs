import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { Product } from './product.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn({ name: 'category_id', type: 'int' })
  categoryId: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
