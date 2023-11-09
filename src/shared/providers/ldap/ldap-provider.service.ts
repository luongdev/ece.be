import * as Strategy from 'passport-ldapauth';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { LdapConfigService } from './ldap-config.service';

@Injectable()
export class LdapService extends PassportStrategy(Strategy, 'ldap') {

    constructor(
        private readonly _configService: ConfigService,
    ) {
        super(LdapService.createOptions(_configService), async (req: Request, user: any, done) => {
            req['user'] = user;
            return done(null, user);
        });
    }

    private static createOptions(configService: ConfigService): any {
        const ldapConfigService = new LdapConfigService(configService);
        const url = ldapConfigService.url;
        const bindDN = ldapConfigService.bindDN;
        const bindCredentials = ldapConfigService.bindCredentials;
        const searchBase = ldapConfigService.searchBase;
        return {
            passReqToCallback: true,
            server: {
                url: url,
                bindDN: bindDN,
                bindCredentials: bindCredentials,
                searchBase: searchBase,
                searchFilter: '(cn={{username}})',
                searchAttributes: ['uid', 'displayName', 'mail']
            },
        };
    }
}



