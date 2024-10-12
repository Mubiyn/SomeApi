import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ToDoEntity } from "./todo.entity";

@Entity('Users') 
export class UserEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    username: string;
    @Column()
    password:string;
    @Column()
    salt: string;

    @OneToMany(()=>ToDoEntity, (todo)=> todo.user)
    todos: ToDoEntity[]
}

