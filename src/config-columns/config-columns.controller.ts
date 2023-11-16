import { Controller, Post, Body, Req } from '@nestjs/common';
import { ConfigColumnsService } from './config-columns.service';

@Controller('config-columns')
export class ConfigColumnsController {
  constructor(private readonly configColumnsService: ConfigColumnsService) { }

  @Post()
  create(@Req() req, @Body() data: any) {
    const username = req?.user?.username;
    return this.configColumnsService.create(username, data);
  }
}
