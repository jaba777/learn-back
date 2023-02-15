import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';


@Entity({name: 'client'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number | string;

    @Column({
        unique: true,
        nullable: false
    })
    username!: string;

    @Column({
        unique: true,
        nullable: false
    })
    email!: string;

    @Column({
        nullable: false
    })
    password!: string;

    

   
    
    hashPassword():void{
        const salt = bcrypt.genSaltSync(12);
        this.password=bcrypt.hashSync(this.password,salt)
    }

    checkPassword(password: string):boolean{
        return bcrypt.compareSync(password,this.password);
    }

}