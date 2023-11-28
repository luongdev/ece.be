import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthConfigService {
    constructor(
        private readonly _configService: ConfigService
    ) { }

    get secretKey(): string {
        return this._configService.get<string>('SECRET_KEY') || 'Metech@2023!@#';
    }

    get secretKeyRefresh(): string {
        return this._configService.get<string>('SECRET_KEY_REFRESH') || 'Metech@2023!@#Refresh';
    }

    get JWTExpirationTime(): string {
        return this._configService.get<string>('JWT_EXPIRATION_TIME') || '5p';
    }

    get JWTExpirationTimeRefresh(): string {
        return this._configService.get<string>('JWT_EXPIRATION_TIME_REFRESH') || '1d';
    }

}
