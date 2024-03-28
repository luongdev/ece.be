import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ADFSConfigService } from './adfs-config.service';
import * as Strategy from 'passport-oauth2';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

@Injectable()
export class AdfsOAuth2StrategyService extends PassportStrategy(Strategy, 'adfs') {
    constructor(
        private readonly _configService: ConfigService,
    ) {
        super(AdfsOAuth2StrategyService.createOptions(_configService),
            (req, accessToken, refreshToken, params, profile, done) => {
                const payload = accessToken.split(".");
                const decoded = JSON.parse(Buffer.from(String(payload[1]), 'base64').toString('utf8'));
                req['user'] = decoded;
                return done(null, decoded);
            });
    }

    private static createOptions(configService: ConfigService): any {
        const adfsConfigService = new ADFSConfigService(configService);
        const authorizationUrl = adfsConfigService.authorizationUrl;
        const tokenUrl = adfsConfigService.tokenUrl;
        const clientId = adfsConfigService.clientId;
        const clientSecret = adfsConfigService.clientSecret;
        const callbackUrl = adfsConfigService.callbackUrl;

        return {
            authorizationURL: authorizationUrl,
            tokenURL: tokenUrl,
            clientID: clientId,
            clientSecret: clientSecret,
            callbackURL: callbackUrl,
            scope: ['openid', 'profile', 'email'],
            passReqToCallback: true,
        };
    }
}
