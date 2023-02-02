import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, Generated } from "typeorm"

@Entity({name: 'users'})
export class Posts extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title!: string;

    @Column()
    desc!: string;

    @Column()
    
    uid!: number;
}