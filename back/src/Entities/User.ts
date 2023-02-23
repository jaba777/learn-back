import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';

import  Posts  from './Posts'


@Entity({name: 'client'})
 class User extends BaseEntity {
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


    @OneToMany(() => Posts, (post)=>post.user,{cascade: true}) 
    posts!: Posts[];  

   

}

export default User;

