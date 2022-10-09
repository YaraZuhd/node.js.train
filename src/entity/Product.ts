import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    JoinTable,
    ManyToMany,
    UpdateDateColumn,
  } from "typeorm";
import { Category } from "./Category";
  
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


    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];
}
