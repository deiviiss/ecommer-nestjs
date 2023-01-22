import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Exclude, Expose } from 'class-transformer';

import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id', type: 'int' })
  orderId: number;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    nullable: true,
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Expose()
  get products() {
    //agrupa los productos
    if (this.items) {
      const ifProducts = this.items.filter((item) => !!item);

      const iproducts = ifProducts.map((item) => ({
        ...item.product,
        quantity: item.quantity,
        itemId: item.itemId,
      }));

      return iproducts;
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.items) {
      const itotal = this.items
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItem = item.quantity * item.product.price;

          return total + totalItem;
        }, 0);

      return itotal;
    }
    return 0;
  }

  @Exclude()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

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
}
