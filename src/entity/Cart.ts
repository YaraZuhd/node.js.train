import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany
  } from "typeorm";
import { Order } from "./Order";
import { OrderItems } from "./orderItems";
  
  @Entity()
  export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      nullable : true,
    })
    quentity: number = 0;

    @Column({
      nullable : true,
    })
    price: number = 0;

    @Column({
      nullable : true
    })
    status : String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Order, (orders)=>orders.cart, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }) 
    orders: Order;
    @OneToMany(() => OrderItems, (items)=>items.cart, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    items: OrderItems[];

  }

