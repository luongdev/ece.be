import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';

@Controller('logout')
export class LogoutController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post()
  logOut(@Req() req) {
    const username = req?.user?.username;
    return this.authService.deleteRefreshToken(username);
  }

}
