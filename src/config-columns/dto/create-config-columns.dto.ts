import { IsArray } from "class-validator";

export class CreateConfigColumnDto {
  @IsArray()
  config: any;
}
