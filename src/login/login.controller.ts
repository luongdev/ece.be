import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { VerifyLoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(

    private readonly loginService: LoginService
  ) { }

  // @UseGuards(AuthGuard('ldap'))
  // @Post('')
  // async ldapLogin(@Req() req) {
  //   const infoAccount = req.user;
  //   const jwtToken = this.authService.generateJwtToken(infoAccount);
  //   const refreshToken = await this.authService.generateRefreshToken(infoAccount);
  //   const configColumn = await this.configColumnService.findConfigByUserName(infoAccount.username);

  //   return { token: jwtToken, refreshToken, displayName: infoAccount.displayName || 'VPBanker', configColumn: configColumn?.configs };
  // }

  @Post('')
  async Login(@Body() verifyLoginDto: VerifyLoginDto) {
    return this.loginService.login(verifyLoginDto);
  }

}
