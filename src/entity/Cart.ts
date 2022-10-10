import {
    Entity,
    Column,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn
  } from "typeorm";
  
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

