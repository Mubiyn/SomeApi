import { IsNotEmpty, MaxLength } from "@nestjs/class-validator";

export class CreateTodoDto{
    @IsNotEmpty()
    @MaxLength(20, {message:'Max length is 20 characters'})
    title: string;

    @IsNotEmpty()
    description:string;
}