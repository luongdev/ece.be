import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
  Query,
} from "@nestjs/common";
import { ManageUserLocalService } from "./manage-user-local.service";

@Controller("user")
export class ManageUserLocalController {
  constructor(
    private readonly manageUserLocalService: ManageUserLocalService
  ) {}

  @Get("/")
  getListUser(@Query() getUserDto: any) {
    return this.manageUserLocalService.getListuser(getUserDto);
  }
  @Post("/")
  addUser(@Body() body: any) {
    return this.manageUserLocalService.addUser(body);
  }

  @Delete("/many")
  deleteUsers(@Body("ids") ids: string[]) {
    return this.manageUserLocalService.deleteUsers(ids);
  }

  @Delete("/:id")
  deleteUser(@Param("id") id: string) {
    console.log("Delete User", id);
    return this.manageUserLocalService.deleteUser(id);
  }
  @Get("/:id")
  getUserById(@Param("id") id: string) {
    return this.manageUserLocalService.getUserById(id);
  }

  @Put("/:id")
  updateUser(@Param("id") id: string, @Body() body: any) {
    const { data } = body;
    return this.manageUserLocalService.updateUserById(id, data);
  }
}
