import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
    OneToMany,
  } from "typeorm";
import bcrypt from "bcryptjs";
import { Cart } from "./Cart";
import { Order } from "./Order";
  
  @Entity()
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      nullable : true
    })
    firstname: string;
  
    @Column({
      nullable : true
    })
    lastname: string;
  
    @Column({
      nullable : true
    })
    gender: string;
  
    @Column({
      nullable : true
    })
    phone: string;
  
    @Column({
      unique: true,
      nullable : true
    })
    email: string;
  
    @Column({
      nullable : true
    })
    password: string;
  
    @Column()
    address : string;
  
    @Column({
      nullable : true,
      default : "user"
    })
    role: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Cart,{
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    @JoinColumn()
    cart: Cart;

    @OneToMany(() => Order, (order) => order.user,{
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    orders: Order[];

    hashpassword(){
        this.password =  bcrypt.hashSync(this.password);
    }
  
    validatenonhashpassword(password : string){
       return bcrypt.compareSync(password,this.password);
    }
  
  }

  