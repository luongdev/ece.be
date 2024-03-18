import { BadRequestException, Injectable } from '@nestjs/common';
import { VerifyLoginDto } from './dto/login.dto';
import { ManageUserLocalService } from '@/manage-user-local/manage-user-local.service';
import { ConfigColumnsService } from '@/config-columns/config-columns.service';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class LoginService {
    constructor(
        private readonly manageUserLocalService: ManageUserLocalService,
        private readonly authService: AuthService,
        private readonly configColumnService: ConfigColumnsService,
    ) { }
    async login(verifyLoginDto: VerifyLoginDto) {
        const { username, password } = verifyLoginDto;
        const verify = await this.manageUserLocalService.checkUsernameAndPassword(username, password);
        if (verify == false) {
            throw new BadRequestException("Username or password invalid !");
        }
        const jwtToken = this.authService.generateJwtToken(verify);
        const refreshToken = await this.authService.generateRefreshToken(verify);
        const configColumn = await this.configColumnService.findConfigByUserName(verify.username);

        return { token: jwtToken, refreshToken, displayName: verify.username || 'VPBanker', configColumn: configColumn?.configs , roles : verify.role };
    }

    async verifyCallback(infoAccount) {
        const { upn, appid, iss, scp } = infoAccount;
        const payload = { username: upn, appid, iss, scp };
        if (!infoAccount) {
            throw new BadRequestException("verify fail !");
        }
        const checkExistUser = await this.manageUserLocalService.findInfoByUserName(upn);
        if (checkExistUser == false) {
            throw new BadRequestException("User not exists in local !");
        }
        const jwtToken = this.authService.generateJwtToken(payload);
        const refreshToken = await this.authService.generateRefreshToken(payload);
        const configColumn = await this.configColumnService.findConfigByUserName(upn);

        return { token: jwtToken, refreshToken, displayName: upn || 'VPBanker', configColumn: configColumn?.configs };
    }
}
