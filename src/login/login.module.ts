import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'ldap' }),
    AuthModule
  ],
  controllers: [LoginController]
})

export class LoginModule { }
