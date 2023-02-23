import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,ManyToOne } from "typeorm"
import User from './User'

@Entity({name: 'posts'})
 class Posts extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    desc!: string;

    @ManyToOne(() => User,(post)=>post.posts) 
    user!: User;

}

export default Posts;