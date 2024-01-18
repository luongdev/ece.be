import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class GetListDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false, default: 'Nhập text ...' })
    searchMulti: string;

    @ApiProperty({ required: true, default: 1 })
    page: number;

    @ApiProperty({ required: true, default: 10 })
    pageSize: number;

    @IsString()
    @IsOptional()
    caseId: string;

    @IsString()
    @IsOptional()
    caseIdCondition: string;

    @IsString()
    @IsOptional()
    activityId: string;

    @IsString()
    @IsOptional()
    activityIdCondition: string;

    @IsString()
    @IsOptional()
    subject: string;

    @IsString()
    @IsOptional()
    subjectCondition: string;

    @IsString()
    @IsOptional()
    from: string;

    @IsString()
    @IsOptional()
    fromCondition: string;

    @IsString()
    @IsOptional()
    to: string;

    @IsString()
    @IsOptional()
    toCondition: string;

    @IsArray()
    @IsOptional()
    assignedTo: [];

    @IsArray()
    @IsOptional()
    createOn: any;

    @IsString()
    @IsOptional()
    subStatus: string;

    @IsArray()
    @IsOptional()
    queueName: [];

    @IsArray()
    @IsOptional()
    priority: [];

    @IsString()
    @IsOptional()
    file: string;

    @IsString()
    @IsOptional()
    direction: string;

    @IsString()
    @IsOptional()
    system: string;
}