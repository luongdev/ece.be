import { Controller, Get, Param, Query } from '@nestjs/common';
import { ManageEmailService } from './manage-email.service';
import { GetListDto } from './dto/get-list.dto';
import { Roles } from '@/auth/roles/role.decorator';
import { Role } from '@/auth/roles/enum/role.enum';

@Controller('manage-email')
export class ManageEmailController {
  constructor(private readonly manageEmailService: ManageEmailService) { }

  @Get('/get-list')
  @Roles(Role.Admin)
  getListEmail(@Query() getListDto: GetListDto) {
    return this.manageEmailService.getListEmail(getListDto);
  }

  @Get('/activity-detail/:activityId')
  getActivityDetail(@Param('activityId') activityId, @Query('system') system) {
    return this.manageEmailService.getActivityDetail(activityId, system);
  }

  @Get('/case-detail/:caseId')
  getCaseDetail(@Param('caseId') caseId, @Query('system') system) {
    return this.manageEmailService.getCaseDetail(caseId, system);
  }

}
