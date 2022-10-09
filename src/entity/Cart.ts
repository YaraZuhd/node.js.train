import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    OneToOne,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
    PrimaryColumn
  } from "typeorm";
import { Product } from "./Product";
  
  @Entity()
  export class Cart extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column({
      nullable : true,
    })
    quentity: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

  }

