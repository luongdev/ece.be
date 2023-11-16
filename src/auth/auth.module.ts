import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { LoggerProviderModule } from '@/shared/providers';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RefreshTokenEntity,
        ]),
        LoggerProviderModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService],
})

export class AuthModule { }
