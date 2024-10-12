import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UserEntity } from 'src/Entity/user-entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth-strategy';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  JwtModule.register({
    secret:'snjskjsbhvjkbqvkqbk',
    signOptions:{
      algorithm:'HS512',
      expiresIn:'id'
    }
  }),
  PassportModule.register({
    defaultStrategy:'jwt'
  })
],
  providers: [AuthService, AuthStrategy],
  controllers: [AuthController],
  exports:[PassportModule, AuthStrategy]
})
export class AuthModule {}
