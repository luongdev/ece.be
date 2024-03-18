import { INVALID_TOKEN, PERMISSION_DENIED } from '@/constants/errors';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthConfigService } from './auth-config';
import { ACCEPT_URL_ADMIN, EXCLUDE_PATH, URL_BOTH } from '@/constants';
import { ROLE } from '@/manage-user-local/constant';

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
        if (EXCLUDE_PATH.includes(req.baseUrl)) return next();

        const token = req.headers.authorization?.split(' ')[1];

        if (token) {
            try {
                const decoded = jwt.verify(token, this.secretKey);
                req['user'] = decoded;

                this.verifyPermissionAcceptToUrl(decoded.role, req.baseUrl, next);

            } catch (err) {
                throw new UnauthorizedException(err.message);
            }
        } else {
            throw new UnauthorizedException(INVALID_TOKEN);
        }
    }

    private verifyPermissionAcceptToUrl(role, baseUrl, next) {
        if (role == ROLE.ALL) return next();
        if (URL_BOTH.some(prefix => baseUrl.startsWith(prefix))) {
            return next();
        }
        if (role == ROLE.ADMIN && ACCEPT_URL_ADMIN.some(prefix => baseUrl.startsWith(prefix))) {
            return next();
        }
        if (role == ROLE.USER && ACCEPT_URL_ADMIN.some(prefix => baseUrl.startsWith(prefix)) == false) {
            return next();
        }
        throw new UnauthorizedException(PERMISSION_DENIED);
    }
}
