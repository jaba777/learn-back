import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"


@Entity({name: 'client'})
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

}