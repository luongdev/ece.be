import { Controller, Get, Param } from '@nestjs/common';
import { ManageEmailService } from './manage-email.service';

@Controller('manage-email')
export class ManageEmailController {
  constructor(private readonly manageEmailService: ManageEmailService) { }

  @Get('/get-list')
  getListEmail() {
    return this.manageEmailService.getListEmail();
  }

  @Get('/activity-detail/:activityId')
  getActivityDetail(@Param('activityId') activityId) {
    return this.manageEmailService.getActivityDetail(activityId);
  }

  @Get('/case-detail/:caseId')
  getCaseDetail(@Param('caseId') caseId) {
    return this.manageEmailService.getCaseDetail(caseId);
  }

}
