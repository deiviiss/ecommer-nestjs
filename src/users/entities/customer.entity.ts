import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';

import { User } from './user.entity';
import { Order } from './order.entity';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn({
    name: 'customer_id',
  })
  customerId: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  phone: number;

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

  @OneToOne(() => User, (user) => user.customer, {
    nullable: true,
  })
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
