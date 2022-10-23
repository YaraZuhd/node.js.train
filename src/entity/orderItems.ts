
import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    PrimaryColumn,
  } from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";
  
  @Entity()
  export class OrderItems extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @ManyToOne(() => Order, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable : true,
    })
    order: Order;

    @Column({
        nullable : true
    })
    quantity : number = 0;


    @ManyToOne(() => Cart, {
        nullable : true,
    })
    cart: Cart;

    



  }
