import {
    Entity,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    orderDate: Date;
  
}