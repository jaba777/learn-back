import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,ManyToOne } from "typeorm"
import {User} from './User'

@Entity({name: 'posts'})
export class Posts extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    desc!: string;

    @Column()
    uid!: number;

    @ManyToOne(() => User,(post)=>post.posts) 
    user!: User;

}