import { Module } from '@nestjs/common';
import { LogoutController } from './logout.controller';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [LogoutController]
})
export class LogoutModule { }
