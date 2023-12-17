import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class GetListDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false, default: 'Nhập text ...' })
    searchMulti: string;

    @ApiProperty({ required: true, default: 1 })
    page: number;

    @ApiProperty({ required: true, default: 10 })
    pageSize: number;
}