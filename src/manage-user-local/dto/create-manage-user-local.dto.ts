import { IsIn, IsNumber, IsString, MaxLength } from "class-validator";
import { ROLE, TYPE } from "../constant";

export class CreateManageUserLocalDto {
    @IsString()
    @MaxLength(50)
    username: string;

    @IsNumber()
    @IsIn([TYPE.LOCAL, TYPE.SSO])
    type: number;

    @IsString()
    password: string;

    @IsNumber()
    @IsIn([ROLE.USER, ROLE.ADMIN, ROLE.ALL])
    role: number;
}
