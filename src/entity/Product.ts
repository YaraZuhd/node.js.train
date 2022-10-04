import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
  } from "typeorm";
  
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
    desription : string;
  
    @CreateDateColumn()
    createdAt: Date;
  
  }
