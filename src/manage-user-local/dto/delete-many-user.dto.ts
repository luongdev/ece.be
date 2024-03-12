import { IsArray } from "class-validator";

export class DeleteManyUserDto {
    @IsArray()
    ids: string[];
}
