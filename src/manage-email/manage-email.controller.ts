import { Controller, Get, Param, Query } from '@nestjs/common';
import { ManageEmailService } from './manage-email.service';
import { GetListDto } from './dto/get-list.dto';

@Controller('manage-email')
export class ManageEmailController {
  constructor(private readonly manageEmailService: ManageEmailService) { }

  @Get('/get-list')
  getListEmail(@Query() getListDto: GetListDto) {
    return this.manageEmailService.getListEmail(getListDto);
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
