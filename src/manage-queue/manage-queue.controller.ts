import { Controller, Get, Query } from '@nestjs/common';
import { ManageQueueService } from './manage-queue.service';

@Controller('manage-queue')
export class ManageQueueController {
  constructor(private readonly manageQueueService: ManageQueueService) { }

  @Get('get-list')
  getList(@Query('system') system) {
    return this.manageQueueService.getList(system);
  }

}
