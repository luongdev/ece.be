import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly _authService: AuthService
    ) { }

    @Post('refresh-token')
    async refreshAccessToken(@Body() { refreshToken }: { refreshToken: string; }): Promise<any> {
        const { newAccessToken, newRefreshToken } = await this._authService.refreshAccessToken(refreshToken);

        return { token: newAccessToken, refreshToken: newRefreshToken };
    }
}
