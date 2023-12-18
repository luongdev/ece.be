import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { AuthConfigService } from './auth-config';
import { InjectRepository } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './entities/refresh-token.entity';
import { Repository } from 'typeorm';
import { LoggerService } from '@/shared/logging';
import { LoggerFactory } from '@/shared/providers/logger/logger.factory';
import { REFRESH_TOKEN_NOT_EXISTS } from '@/constants/errors';
const crypto = require('crypto');

@Injectable()
export class AuthService {
    private readonly secretKey: string;
    private readonly secretKeyRefresh: string;
    private readonly jwtExpirationTime: string;
    private readonly refreshTokenExpirationTime: string;
    private readonly log: LoggerService;
    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(RefreshTokenEntity)
        private refreshTokenRepository: Repository<RefreshTokenEntity>,
        loggerFactory: LoggerFactory
    ) {
        const authConfigService = new AuthConfigService(this.configService);
        this.secretKey = authConfigService.secretKey;
        this.secretKeyRefresh = authConfigService.secretKeyRefresh;
        this.jwtExpirationTime = authConfigService.JWTExpirationTime;
        this.refreshTokenExpirationTime = authConfigService.JWTExpirationTimeRefresh;
        this.log = loggerFactory.createLogger(AuthService);
    }


    generateJwtToken(payload: any): string {
        return jwt.sign(payload, this.secretKey, { expiresIn: this.jwtExpirationTime });
    }

    async generateRefreshToken(payload: any) {
        const username = payload?.username;
        this.log.debug(`Username check refresh token is: ${username}`);
        const refreshToken = jwt.sign(payload, this.secretKeyRefresh, { expiresIn: this.refreshTokenExpirationTime });
        const hashRefreshToken = await crypto.createHash('sha256').update(refreshToken).digest('hex');
        await this.insertOrUpdateRefreshToken(username, hashRefreshToken);
        return refreshToken;
    }

    async refreshAccessToken(refreshToken: string) {
        try {
            const decoded = jwt.verify(refreshToken, this.secretKeyRefresh);
            delete decoded.exp;
            delete decoded.iat;

            const hashRefreshToken = await crypto.createHash('sha256').update(refreshToken).digest('hex');

            const checkExists = await this.refreshTokenRepository.findOne({ where: { username: decoded.username, refreshToken: hashRefreshToken } });

            if (!checkExists) throw new BadRequestException(REFRESH_TOKEN_NOT_EXISTS);

            const newAccessToken = this.generateJwtToken(decoded);
            const newRefreshToken = await this.generateRefreshToken(decoded);

            return { newAccessToken, newRefreshToken };
        } catch (error) {
            throw new UnauthorizedException('Get new token fail !');
        }
    }

    async insertOrUpdateRefreshToken(username: string, refreshToken: string) {
        const findRefreshToken = await this.refreshTokenRepository.findOne({ where: { username } });

        if (!findRefreshToken) return this.refreshTokenRepository.insert({ username, refreshToken });

        return this.refreshTokenRepository.update({ username }, { refreshToken });
    }

    deleteRefreshToken(username: string) {
        return this.refreshTokenRepository.delete({ username });
    }
}