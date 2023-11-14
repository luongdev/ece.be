import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { INVALID_TOKEN_REFRESH } from '@/constants/errors';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService
    ) { }

    @Post('refresh-token')
    async refreshAccessToken(@Body() { refreshToken }: { refreshToken: string; }): Promise<any> {
        try {
            const newAccessToken = this._authService.refreshAccessToken(refreshToken);

            return { accessToken: newAccessToken };
        } catch (error) {
            console.log(`Refresh token error is: ${error.message}`);

            return INVALID_TOKEN_REFRESH;
        }
    }
}
