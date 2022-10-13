import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany,
  } from "typeorm";
import { Cart } from "./Cart";
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

    @ManyToOne(() => User, (user) => user.orders,{
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    @JoinColumn()
    user: User;

    @OneToMany(() => Product, (prodcutItems)=>prodcutItems.order,{
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    productItems: Product[];

    @ManyToOne(()=> Cart , (cart) => cart.orders,{
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    cart : Cart
}