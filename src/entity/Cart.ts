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

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Order, (orders)=>orders.cart, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
  })
    orders: Order[];

  }

