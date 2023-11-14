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
  ldapLogin(@Req() req) {
    const username = req.user;
    const jwtToken = this.authService.generateJwtToken({ username });
    const refreshToken = this.authService.generateRefreshToken({ username });

    return { token: jwtToken, refreshToken };
  }

}
