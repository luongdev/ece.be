import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'ldap' }),
  ],
  controllers: [LoginController]
})

export class LoginModule { }
