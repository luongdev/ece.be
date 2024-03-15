import { Controller, Post, UseGuards, Req, Body, Get } from '@nestjs/common';
import { VerifyLoginDto } from './dto/login.dto';
import { LoginService } from './login.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService
  ) { }

  @Get('adfs')
  @UseGuards(AuthGuard('adfs'))
  async adfsLogin(@Req() req) {
    return true;
  }

  @Get('verifyCallback')
  @UseGuards(AuthGuard('adfs'))
  async verifyCallback(@Req() req) {
    const infoAccount = req.user;
    return this.loginService.verifyCallback(infoAccount);
  }

  @Post('')
  async Login(@Body() verifyLoginDto: VerifyLoginDto) {
    return this.loginService.login(verifyLoginDto);
  }

}
