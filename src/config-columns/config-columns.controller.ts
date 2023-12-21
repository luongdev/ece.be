import { Controller, Post, Body, Req, Delete } from '@nestjs/common';
import { ConfigColumnsService } from './config-columns.service';
import { CreateConfigColumnDto } from './dto/create-config-columns.dto';

@Controller('config-columns')
export class ConfigColumnsController {
  constructor(private readonly configColumnsService: ConfigColumnsService) { }

  @Post()
  create(@Req() req, @Body() body: CreateConfigColumnDto) {
    const username = req?.user?.username;
    return this.configColumnsService.create(username, body);
  }

}
