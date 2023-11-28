import { INVALID_TOKEN } from '@/constants/errors';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthConfigService } from './auth-config';
import { EXCLUDE_PATH } from '@/constants';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    private readonly secretKey: string;
    constructor(
        private readonly configService: ConfigService
    ) {
        const authConfigService = new AuthConfigService(this.configService);
        this.secretKey = authConfigService.secretKey;
    }
    use(req: Request, res: Response, next: NextFunction) {
        if (EXCLUDE_PATH.includes(req.originalUrl)) return next();

        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            try {
                const decoded = jwt.verify(token, this.secretKey);
                req['user'] = decoded;

                next();
            } catch (err) {
                throw new UnauthorizedException(err.message);
            }
        } else {
            throw new UnauthorizedException(INVALID_TOKEN);
        }
    }
}
