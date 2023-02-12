import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, IsNull,Not } from "typeorm"


@Entity({name: 'client'})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

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

}