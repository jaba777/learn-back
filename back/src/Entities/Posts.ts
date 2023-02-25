import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,ManyToOne,JoinColumn } from "typeorm"
import User from './User'

@Entity({name: 'post'})
 class Posts extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number | string;

    @Column()
    title!: string;

    @Column()
    desc!: string;

    @ManyToOne(() => User,(post)=>post.posts,{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: false
    }) 
    @JoinColumn({ 
        foreignKeyConstraintName: 'userId'
    })
    user!: User;

    @Column()
    userId!:number;


}

export default Posts;