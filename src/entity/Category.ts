import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({
      nullable : true
    })
    name: string;

    @CreateDateColumn()
    createdAt: Date;


    @UpdateDateColumn()
    updatedAt: Date;
  
  }


