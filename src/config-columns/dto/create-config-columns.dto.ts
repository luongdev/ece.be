import { IsArray, IsEmpty, IsString } from "class-validator";

export class CreateConfigColumnDto {
    @IsArray()
    config: any;
}