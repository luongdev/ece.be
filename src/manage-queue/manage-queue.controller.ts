import { Controller, Get } from '@nestjs/common';
import { ManageQueueService } from './manage-queue.service';

@Controller('manage-queue')
export class ManageQueueController {
  constructor(private readonly manageQueueService: ManageQueueService) { }

  @Get('get-list')
  getList() {
    return this.manageQueueService.getList();
  }

}
