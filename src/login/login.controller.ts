import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('login')
export class LoginController {
  constructor() { }

  @UseGuards(AuthGuard('ldap'))
  @Post('')
  ldapLogin(@Req() req) {
    return req.user;
  }

}
