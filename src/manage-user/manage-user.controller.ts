import { Controller, Get, Query } from "@nestjs/common";
import { ManageUserService } from "./manage-user.service";

@Controller("manage-user")
export class ManageUserController {
  constructor(private readonly manageUserService: ManageUserService) { }

  @Get("get-list")
  getList(@Query('system') system) {
    return this.manageUserService.getList(system);
  }
}
