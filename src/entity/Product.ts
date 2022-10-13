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
    JoinColumn,
  } from "typeorm";
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
    quantity: number;
  
    @Column({
      nullable : true
    })
    desription : string;
  
    @CreateDateColumn()
    createdAt: Date;


    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Category,{
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    @JoinTable()
    categories: Category[];

    @ManyToOne(() => Order, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    @JoinColumn()
    order: Order;

}
