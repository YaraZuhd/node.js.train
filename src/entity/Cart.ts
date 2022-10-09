import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    OneToOne,
    UpdateDateColumn,
    JoinColumn
  } from "typeorm";
import { User } from "./User";
  
  @Entity()
  export class Cart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      nullable : true,
    })
    quentity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // @OneToOne(() => User)
    // @JoinColumn()
    // public user: User;

  }

