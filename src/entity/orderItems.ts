
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
    @PrimaryGeneratedColumn()
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

    @Column({
      nullable : true
   })
    price : number = 0;

    @Column({
      nullable : true
   })
    productId : number ;

    @Column({
      nullable : true
    })
    productName : string;

    @Column({
      nullable : true
   })
    cID : number;


    @ManyToOne(() => Cart, {
        nullable : true,
    })
    cart: Cart;

  }

