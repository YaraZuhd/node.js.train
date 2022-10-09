import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    JoinTable,
    ManyToMany,
    UpdateDateColumn,
    ManyToOne,
  } from "typeorm";
import { Cart } from "./Cart";
import { Category } from "./Category";
import { Order } from "./Order";
  
  @Entity()
  export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      nullable : true
    })
    name: string;
  
    @Column({
      nullable : true
    })
    price: number;

    @Column({
      nullable : true
    })
    quintity: number;
  
    @Column({
      nullable : true
    })
    desription : string;
  
    @CreateDateColumn()
    createdAt: Date;


    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @ManyToOne(() => Order, (order) => order.productItems)
    order: Order
}
