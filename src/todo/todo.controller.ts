import {Body,Param, Controller, Get, Post,Patch,Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from 'src/DTO/create-todo-dto';
import { TodoStatus } from 'src/Entity/todo.entity';
import { ToDoStatusValidationPipe } from 'src/Pipes/Todostatus-validation-pipe';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/Entity/user-entity';
import { User } from 'src/auth/user-decorator';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodoController {
constructor(private todoService: TodoService){}

    @Get()
    getAllTodos(
        @User() user: UserEntity
    ){
     return this.todoService.getAllTodos(user) ;   
     }

     @Post()
     createNewTodo(@Body(ValidationPipe) data:CreateTodoDto,
     @User() user: UserEntity
     ){
      return this.todoService.createNewTodo(data, user) ;   
      }

      @Patch(':id')
      updateTodo(@Body('status', ToDoStatusValidationPipe) status: TodoStatus,
                @Param('id') id: number,
                @User() user: UserEntity
      ){
       return this.todoService.updateTodo(id, status, user);   
       }

       @Delete(':id')
      deleteTodo(@Param('id') id: number, @User() user: UserEntity
      ){
       return this.todoService.deleteTodo(id, user);   
       }
}
