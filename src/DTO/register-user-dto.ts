import { IsNotEmpty,MinLength, MaxLength } from "@nestjs/class-validator";

export class CreateUserDto{
    @IsNotEmpty()
    @MaxLength(20, {message:'Max length is 20 characters'})
    username: string;

    @IsNotEmpty()
    @MinLength(12)
    @MaxLength(12, {message:'Max length is 12 characters'}) 
    password:string;
}

export class LoginUserDto{
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password:string;
}