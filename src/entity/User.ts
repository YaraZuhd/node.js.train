import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
import bcrypt from "bcryptjs";


// export enum RoleEnumType {
//     USER = 'user',
//     ADMIN = 'admin',
// }
  
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
      //type: 'enum',
      //enum: RoleEnumType,
      default: "user",
    })
    role: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    hashpassword(){
        this.password = bcrypt.hashSync(this.password);
    }
  
    validatenonhashpassword(password : string){
        //return bcrypt.compare(password,this.password);
       return bcrypt.compareSync(password,this.password);
    }
  
  }

  