import { PartialType } from '@nestjs/swagger';
import { CreateManageEmailDto } from './create-manage-email.dto';

export class UpdateManageEmailDto extends PartialType(CreateManageEmailDto) {}
