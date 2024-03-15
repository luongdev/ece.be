import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '@/auth/auth.module';
import { ConfigColumnsService } from '@/config-columns/config-columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigColumnEntity } from '@/config-columns/entities/config-column.entity';
import { LoginService } from './login.service';
import { ManageUserLocalModule } from '@/manage-user-local/manage-user-local.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConfigColumnEntity,
    ], 'db_new'),
    PassportModule.register({ defaultStrategy: 'adfs' }),
    AuthModule,
    ManageUserLocalModule
  ],
  controllers: [LoginController],
  providers: [ConfigColumnsService, LoginService]
})

export class LoginModule { }
