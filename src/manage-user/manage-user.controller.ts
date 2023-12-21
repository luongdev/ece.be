import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManageUserService } from './manage-user.service';

@Controller('manage-user')
export class ManageUserController {
  constructor(private readonly manageUserService: ManageUserService) { }

  @Get('get-list')
  getList() {
    return this.manageUserService.getList();
  }

}
