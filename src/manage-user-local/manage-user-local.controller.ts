import { Controller, Get, Post, Body, Param, Delete, Query, Put, Req } from '@nestjs/common';
import { ManageUserLocalService } from './manage-user-local.service';
import { CreateManageUserLocalDto } from './dto/create-manage-user-local.dto';
import { UpdateManageUserLocalDto } from './dto/update-manage-user-local.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { DeleteManyUserDto } from './dto/delete-many-user.dto';
import { GetListDto } from './dto/get-list.dto';

@Controller('manage-user-local')
@ApiBearerAuth()
export class ManageUserLocalController {
  constructor(private readonly manageUserLocalService: ManageUserLocalService) { }

  @Post()
  create(@Body() createManageUserLocalDto: CreateManageUserLocalDto, @Req() req) {
    const userInfo = req.user;
    return this.manageUserLocalService.create(createManageUserLocalDto, userInfo);
  }

  @Get()
  findAll(@Query() getListDto: GetListDto) {
    return this.manageUserLocalService.findAll(getListDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manageUserLocalService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateManageUserLocalDto: UpdateManageUserLocalDto, @Req() req) {
    const userInfo = req.user;
    return this.manageUserLocalService.update(id, updateManageUserLocalDto, userInfo);
  }

  @Delete('/deleteOne/:id')
  remove(@Param('id') id: string) {
    return this.manageUserLocalService.remove(id);
  }

  @Delete('deleteMany')
  deleteMany(@Body() deleteManyUserDto: DeleteManyUserDto) {
    return this.manageUserLocalService.deleteMany(deleteManyUserDto);
  }
}
