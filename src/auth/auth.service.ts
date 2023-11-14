import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { AuthConfigService } from './auth-config';

@Injectable()
export class AuthService {
    private readonly secretKey: string;
    private readonly secretKeyRefresh: string;
    private readonly jwtExpirationTime: string;
    private readonly refreshTokenExpirationTime: string;
    constructor(
        private readonly configService: ConfigService
    ) {
        const authConfigService = new AuthConfigService(this.configService);
        this.secretKey = authConfigService.secretKey;
        this.secretKeyRefresh = authConfigService.secretKeyRefresh;
        this.jwtExpirationTime = authConfigService.JWTExpirationTime;
        this.refreshTokenExpirationTime = authConfigService.JWTExpirationTimeRefresh;
    }


    generateJwtToken(payload: any): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: this.jwtExpirationTime });
    }

    generateRefreshToken(payload: any): string {
        return jwt.sign(payload, this.secretKeyRefresh, { expiresIn: this.refreshTokenExpirationTime });
    }

    refreshAccessToken(refreshToken: string) {
        try {
            const decoded = jwt.verify(refreshToken, this.secretKeyRefresh);

            const newAccessToken = this.generateJwtToken({ username: decoded });

            return newAccessToken;
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}