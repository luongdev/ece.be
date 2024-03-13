import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LdapConfigService } from './adfs-config.service';
import * as Strategy from 'passport-oauth2';

@Injectable()
export class AdfsOAuth2StrategyService extends PassportStrategy(Strategy, 'adfs') {
    constructor(
        private readonly _configService: ConfigService,
    ) {
        super({
            authorizationURL: 'https://mtadfs.metechvn.com/adfs/oauth2/authorize',
            tokenURL: 'https://mtadfs.metechvn.com/adfs/oauth2/token',
            clientID: 'c8ea2124-b248-4d71-88bb-ae699686f609',
            clientSecret: 'hnu_fEwy-J52P3-YLl2sf0AzACBR4mHbcvN8OdmA',
            callbackURL: 'http://10.196.26.18:3000/api/login/callback',
            scope: ['openid', 'profile', 'email'],
        }, (accessToken, refreshToken, profile, done) => {
            console.log(111, accessToken);
            console.log(222, refreshToken);
            console.log(333, profile);

            // You may need to adapt this callback function based on your ADFS configuration and user profile structure.
            // The 'profile' parameter may contain user information.
            return done(null, profile);
        });
    }

    private static createOptions(configService: ConfigService, username?: string, password?: string): any {
        const ldapConfigService = new LdapConfigService(configService);
        const url = ldapConfigService.url;
        const bindDN = ldapConfigService.bindDN;
        const searchBase = ldapConfigService.searchBase;

        // var adfsSigningPublicKey = fs.readFileSync("../../../../adfs-token-signning.cer");

        return {
            path: '/login/callback',
            entryPoint: 'ADFS_ENTRY_POINT_URL',
            //cert: adfsSigningPublicKey,
            callbackUrl: "http://10.196.26.18:3000/callback",
        };
    }
}
