import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn,
  } from "typeorm";
import { Product } from "./Product";
import { User } from "./User";
  
  @Entity()
  export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    orderDate: Date;

    @Column()
    totalPrice : number = 0; 
    
    @Column()
    totalQuentities : number = 0; 


    @OneToMany(() => Product, (product) => product)
    productItems: Product[];

    @OneToOne(() => User, (user) => user.orders) 
    user: User
}