import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"
import {Posts} from './Posts';

@Entity({name: 'users'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        unique: true
    })
    username!: string;

    @Column({
        unique: true
    })
    email!: string;

    @Column()
    password!: string;

    @OneToMany(()=>Posts, (post) => post.uid)
    posts: Posts[]
}