import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from 'src/DTO/register-user-dto';
import { UserEntity } from 'src/Entity/user-entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>, private jwt:JwtService){}

   async registerUser(registerDto: CreateUserDto){
        const {username, password} = registerDto;
        const hashed = await bcrypt.hash(password, 12);
        const salt = bcrypt.getSalt(hashed);
        const userData = new UserEntity();
        userData.username = username;
        userData.password = hashed ;
        userData.salt = salt;
        this.repo.create(userData);
        try {        return await this.repo.save(userData);
            
        } catch (error) {
            return new InternalServerErrorException(error.message)
        }
    }

    async loginUser(loginDto: LoginUserDto){
        const {username, password} = loginDto ;
        const user = await this.repo.findOneBy({username});
        if(!user){
            throw new UnauthorizedException('Invalid Credentials')
        }
    
        // const salt = user.salt;
        const match= await bcrypt.compare(password, user.password);

        if(!match){
            throw new UnauthorizedException('Invalid Credentials') 
        }else{
            const jwtPayload = {username}; 
            const jwtToken = await this.jwt.signAsync(jwtPayload, { expiresIn: '1d', algorithm: 'HS512'});
            return {token:jwtToken};
        }

      
        
    }
}
