import { Module } from "@nestjs/common";
import { ManageEmailService } from "./manage-email.service";
import { ManageEmailController } from "./manage-email.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { egmlEmailEntity } from "../cisco-ece-entities/egml-email.entity";
import { egplCasemgmtActivityEntity } from "../cisco-ece-entities/egpl-casemgmt-activity.entity";
import { egmlEmailAddressEntity } from "../cisco-ece-entities/egml-email-address.entity";
import { egmlEmailAttachmentLinkEntity } from "../cisco-ece-entities/egml-email-attachment-link.entity";
import { egmlEmailDataAltEntity } from "../cisco-ece-entities/egml-email-data-alt.entity";
import { egplCasemgmtCaseEntity } from "../cisco-ece-entities/egpl-casemgmt-case.entity";
import { egplDepartmentEntity } from "../cisco-ece-entities/egpl-department.entity";
import { egplCasemgmtContactPointEntity } from "../cisco-ece-entities/egpl-casemgmt-contact-point.entity";
import { egplCasemgmtCpointEmailEntity } from "../cisco-ece-entities/egpl-casemgmt-cpoint-email.entity";
import { egmlEmailDataEntity } from "../cisco-ece-entities/egml_email_data.entity";
import { egplNotesEntity } from "../cisco-ece-entities/egpl-notes.entity";
import { egplCasemgmtCaseAssEntity } from "../cisco-ece-entities/egpl_casemgmt_case_ass.entity";
import { egplEventHistoryCaseMgmtEntity } from "../cisco-ece-entities/egpl_event_history_case_mgmt.entity";
import { egplCasemgmtCustomerEntity } from "../cisco-ece-entities/egpl-casemgmt-customer.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      egmlEmailEntity,
      egplCasemgmtActivityEntity,
      egmlEmailAddressEntity,
      egmlEmailAttachmentLinkEntity,
      egmlEmailDataAltEntity,
      egplCasemgmtCaseEntity,
      egplDepartmentEntity,
      egplCasemgmtContactPointEntity,
      egplCasemgmtCpointEmailEntity,
      egmlEmailDataEntity,
      egplNotesEntity,
      egplCasemgmtCaseAssEntity,
      egplEventHistoryCaseMgmtEntity,
      egplCasemgmtCustomerEntity,
    ]),
  ],
  controllers: [ManageEmailController],
  providers: [ManageEmailService],
})
export class ManageEmailModule { }
