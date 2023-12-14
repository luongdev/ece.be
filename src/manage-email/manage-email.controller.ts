import { Controller, Get } from '@nestjs/common';
import { ManageEmailService } from './manage-email.service';

@Controller('manage-email')
export class ManageEmailController {
  constructor(private readonly manageEmailService: ManageEmailService) { }

  @Get('/get-list')
  getListEmail() {
    return this.manageEmailService.getListEmail();
  }

}
