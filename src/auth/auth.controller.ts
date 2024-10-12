import { Post,Controller, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from 'src/DTO/register-user-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}
    @Post('register')
    registeration(@Body() data: CreateUserDto){
      return  this.authService.registerUser(data); 
    }

    @Post('login')
    loginUser(@Body() data: LoginUserDto){
      return  this.authService.loginUser(data); 
    }
}
