import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from 'src/DTO/create-todo-dto';
import { ToDoEntity, TodoStatus } from 'src/Entity/todo.entity';
import { UserEntity } from 'src/Entity/user-entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
   
 
  constructor(@InjectRepository(ToDoEntity)private repo: Repository<ToDoEntity>){

  }
 
   async getAllTodos(user: UserEntity){
      const query =  this.repo.createQueryBuilder('todo');

      query.where(`todo.userId = :userId`, {userId: user.id});

      try {
     return  await query.getMany();
        
      } catch (error) {
        throw new NotFoundException('No Todo Found For this User')
      }
    }
    async  createNewTodo(createNewTodo: CreateTodoDto, user: UserEntity){

        const todo = new ToDoEntity();
        const {title, description} = createNewTodo;
        todo.title = title;
        todo.description = description;
        todo.status =  TodoStatus.OPEN
        this.repo.create(todo);
        todo.userId = user.id;
        return await this.repo.save(todo);
    }

   async  updateTodo(id: number, status: TodoStatus, user: UserEntity) {
    try{
        await this.repo.update({id, userId: user.id}, {status});
        return this.repo.findOneBy({id}); 
    } catch (error) {
        throw new InternalServerErrorException("Something went wrong, try again later");   
    }
    }

   async deleteTodo(id: number, user: UserEntity) {
    
    try {
        const result = await this.repo.delete({id, userId:user.id});
        if(result.affected===0){
            throw new NotFoundException('Todo not deleted');
        }else{
        return {success: true};
        }
    } catch (error) {
        throw new InternalServerErrorException("Something went wrong, try again later");   
    }
    }
}
