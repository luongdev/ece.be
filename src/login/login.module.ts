import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '@/auth/auth.module';
import { ConfigColumnsService } from '@/config-columns/config-columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigColumnEntity } from '@/config-columns/entities/config-column.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConfigColumnEntity,
    ]),
    PassportModule.register({ defaultStrategy: 'ldap' }),
    AuthModule
  ],
  controllers: [LoginController],
  providers: [ConfigColumnsService]
})

export class LoginModule { }
