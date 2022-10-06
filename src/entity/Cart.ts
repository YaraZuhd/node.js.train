import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    OneToOne
  } from "typeorm";
import { User } from "./User";
  
  @Entity()
  export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    // @Column({
    //   nullable : true,
    //   default : "None"
    // })
    // cartStatus: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToOne(() => User, (user: User) => user.cart)
    public user: User;

  }

