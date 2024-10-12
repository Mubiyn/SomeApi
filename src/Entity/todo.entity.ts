import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user-entity";

@Entity('TODOS') 
export class ToDoEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    title: string;
    @Column()
    description:string;
    @Column()
    status: TodoStatus;

    @ManyToOne(()=> UserEntity, (user)=>user.todos)
    user: UserEntity

    @Column()
    userId:number;
}

export enum TodoStatus{
    OPEN='OPEN',
    WIP= 'WIP',
    COMPLETED= 'COMPLETED',
}