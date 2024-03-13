import { IsString, MaxLength } from "class-validator";

export class VerifyLoginDto {
    @IsString()
    @MaxLength(50)
    username: string;

    @IsString()
    password: string;
}
