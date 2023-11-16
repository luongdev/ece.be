import { AuthService } from '@/auth/auth.service';
import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class LoginController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @UseGuards(AuthGuard('ldap'))
  @Post('')
  async ldapLogin(@Req() req) {
    const infoAccount = req.user;
    const jwtToken = this.authService.generateJwtToken(infoAccount);
    const refreshToken = await this.authService.generateRefreshToken(infoAccount);

    return { token: jwtToken, refreshToken };
  }

}
