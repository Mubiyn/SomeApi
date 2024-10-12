
import {ArgumentMetadata, PipeTransform, BadRequestException } from '@nestjs/common';
import { TodoStatus } from 'src/Entity/todo.entity';

export class ToDoStatusValidationPipe implements PipeTransform{
    readonly allowedStatuses = [TodoStatus.OPEN, TodoStatus.COMPLETED, TodoStatus.WIP];

    transform(value: any, metadata: ArgumentMetadata) :any{
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is not a valid status`);
        }
        return value;
    }

    private isStatusValid(status:any){
        const index = this.allowedStatuses.indexOf(status);
        return index !== -1
    }
}