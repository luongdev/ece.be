import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ADFSConfigService {
    constructor(
        private readonly _configService: ConfigService
    ) { }

    get authorizationUrl(): string {
        return this._configService.get<string>('AUTHORIZATION_URL');
    }

    get tokenUrl(): string {
        return this._configService.get<string>('TOKEN_URL');
    }

    get clientId(): string {
        return this._configService.get<string>('CLIENT_ID');
    }

    get clientSecret(): string {
        return this._configService.get<string>('CLIENT_SECRET');
    }

    get callbackUrl(): string {
        return this._configService.get<string>('CALLBACK_URL');
    }

}
