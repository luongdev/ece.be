import { AuthService } from '@/auth/auth.service';
import { ConfigColumnsService } from '@/config-columns/config-columns.service';
import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class LoginController {
  constructor(
    private readonly authService: AuthService,
    private readonly configColumnService: ConfigColumnsService,
  ) { }

  @UseGuards(AuthGuard('ldap'))
  @Post('')
  async ldapLogin(@Req() req) {
    const infoAccount = req.user;
    const jwtToken = this.authService.generateJwtToken(infoAccount);
    const refreshToken = await this.authService.generateRefreshToken(infoAccount);
    const configColumn = await this.configColumnService.findConfigByUserName(infoAccount.username);

    return { token: jwtToken, refreshToken, displayName: infoAccount.displayName || 'VPBanker', configColumn: configColumn?.configs };
  }

}
