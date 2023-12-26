import { Module } from '@nestjs/common';
import { ManageEmailService } from './manage-email.service';
import { ManageEmailController } from './manage-email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { egmlEmailEntity } from '@/cisco-ece-entities/egml-email.entity';
import { egplCasemgmtActivity } from '@/cisco-ece-entities/egpl-casemgmt-activity.entity';
import { egmlEmailAddressEntity } from '@/cisco-ece-entities/egml-email-address.entity';
import { egmlEmailAttachmentLinkEntity } from '@/cisco-ece-entities/egml-email-attachment-link.entity';
import { egmlEmailDataAltEntity } from '@/cisco-ece-entities/egml-email-data-alt.entity';
import { egplCasemgmtCaseEntity } from '@/cisco-ece-entities/egpl-casemgmt-case.entity';
import { egplDepartmentEntity } from '@/cisco-ece-entities/egpl-department.entity';
import { egplCasemgmtContactPointEntity } from '@/cisco-ece-entities/egpl-casemgmt-contact-point.entity';
import { egplCasemgmtCpointEmailEntity } from '@/cisco-ece-entities/egpl-casemgmt-cpoint-email.entity';
import { egmlEmailDataEntity } from '@/cisco-ece-entities/egml_email_data.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      egmlEmailEntity,
      egplCasemgmtActivity,
      egmlEmailAddressEntity,
      egmlEmailAttachmentLinkEntity,
      egmlEmailDataAltEntity,
      egplCasemgmtCaseEntity,
      egplDepartmentEntity,
      egplCasemgmtContactPointEntity,
      egplCasemgmtCpointEmailEntity,
      egmlEmailDataEntity,
    ]),
  ],
  controllers: [ManageEmailController],
  providers: [ManageEmailService],
})
export class ManageEmailModule { }
