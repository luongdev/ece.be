import { IsEmpty, IsIn, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";
import { ROLE, TYPE } from "../constant";

export class CreateManageUserLocalDto {
    @IsString()
    @MaxLength(50)
    username: string;

    @IsNumber()
    @IsIn([TYPE.LOCAL, TYPE.SSO])
    type: number;

    @IsString()
    @IsOptional()
    password: string;

    @IsNumber()
    @IsIn([ROLE.USER, ROLE.ADMIN, ROLE.ALL])
    role: number;

    @IsEmpty()
    createdBy: string;

    @IsEmpty()
    updatedBy: string;
}
