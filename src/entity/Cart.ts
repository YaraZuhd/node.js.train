import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn
  } from "typeorm";
  
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

  }

