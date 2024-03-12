import { PartialType } from '@nestjs/mapped-types';
import { CreateManageUserLocalDto } from './create-manage-user-local.dto';

export class UpdateManageUserLocalDto extends PartialType(CreateManageUserLocalDto) {}
