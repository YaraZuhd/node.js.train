import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
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
    name : String;
    
    @Column()
    totalQuentities : number = 0;

    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn()
    user: User;

    @ManyToMany(() => Product, (prodcutItems)=>prodcutItems)
    @JoinTable()
    prodcutItems: Product[];
}