import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    Column,
    JoinColumn,
    ManyToOne,
    OneToMany
  } from "typeorm";
import { Cart } from "./Cart";
import { OrderItems } from "./orderItems";
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
    status : String;
    
    @Column()
    totalQuentities : number = 0;

    @ManyToOne(() => User, (user) => user.orders,{
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    @JoinColumn()
    user: User;

    @OneToMany(() => OrderItems, (items)=>items.order,{
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    items: OrderItems[];

    @ManyToOne(() => Cart, (cart) => cart.orders,{
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    @JoinColumn()
    cart: Cart;

}