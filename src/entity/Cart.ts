import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne
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
    quentity: number;

    @Column({
      nullable : true,
    })
    price: number;

    @Column({
      nullable : true
    })
    status : String;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Order, (order) => order.cart) 
    order: Order;

    @OneToMany(() => OrderItems, (items)=>items.cart, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    items: OrderItems[];

  }

