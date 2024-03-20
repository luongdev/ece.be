import { BadRequestException, Injectable } from '@nestjs/common';
import { VerifyLoginDto } from './dto/login.dto';
import { ManageUserLocalService } from '@/manage-user-local/manage-user-local.service';
import { ConfigColumnsService } from '@/config-columns/config-columns.service';
import { AuthService } from '@/auth/auth.service';
import { PASSWORD_INCORRECT, USERNAME_NOT_EXISTED } from '@/constants/errors';

@Injectable()
export class LoginService {
    constructor(
        private readonly manageUserLocalService: ManageUserLocalService,
        private readonly authService: AuthService,
        private readonly configColumnService: ConfigColumnsService,
    ) { }
    async login(verifyLoginDto: VerifyLoginDto) {
        const { username, password } = verifyLoginDto;
        const checkExistUser = await this.manageUserLocalService.findInfoByUserName(username);
        if (checkExistUser == false) {
            throw new BadRequestException(USERNAME_NOT_EXISTED);
        }
        const verify = await this.manageUserLocalService.checkUsernameAndPassword(username, password);
        if (verify == false) {
            throw new BadRequestException(PASSWORD_INCORRECT);
        }
        const jwtToken = this.authService.generateJwtToken(verify);
        const refreshToken = await this.authService.generateRefreshToken(verify);
        const configColumn = await this.configColumnService.findConfigByUserName(verify.username);

        return { token: jwtToken, refreshToken, displayName: verify.username || 'VPBanker', configColumn: configColumn?.configs, role: verify.role };
    }

    async verifyCallback(infoAccount) {
        const { upn } = infoAccount;
        if (!infoAccount) {
            throw new BadRequestException("verify fail !");
        }
        const checkExistUser = await this.manageUserLocalService.findInfoByUserName(upn);
        if (checkExistUser == false) {
            throw new BadRequestException("User not exists in local !");
        }
        const jwtToken = this.authService.generateJwtToken(checkExistUser);
        const refreshToken = await this.authService.generateRefreshToken(checkExistUser);
        const configColumn = await this.configColumnService.findConfigByUserName(checkExistUser.username);

        return { token: jwtToken, refreshToken, displayName: checkExistUser.username || 'VPBanker', configColumn: configColumn?.configs, role: checkExistUser.role };
    }
}
