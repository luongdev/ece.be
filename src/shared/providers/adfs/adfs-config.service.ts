import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LdapConfigService {
    constructor(
        private readonly _configService: ConfigService
    ) { }

    get url(): string {
        return this._configService.get<string>('URL');
    }

    get bindDN(): string {
        return this._configService.get<string>('BIND_DN');
    }

    get bindCredentials(): string {
        return this._configService.get<string>('BIND_CREDENTIALS');
    }

    get searchBase(): string {
        return this._configService.get<string>('SEARCH_BASE');
    }

}
