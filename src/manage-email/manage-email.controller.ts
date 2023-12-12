import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManageEmailService } from './manage-email.service';
import { CreateManageEmailDto } from './dto/create-manage-email.dto';
import { UpdateManageEmailDto } from './dto/update-manage-email.dto';

@Controller('manage-email')
export class ManageEmailController {
  constructor(private readonly manageEmailService: ManageEmailService) { }

  @Post()
  create(@Body() createManageEmailDto: CreateManageEmailDto) {
    return this.manageEmailService.create(createManageEmailDto);
  }

  @Get('/get-list')
  getListEmail() {
    return this.manageEmailService.getListEmail();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.manageEmailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateManageEmailDto: UpdateManageEmailDto) {
    return this.manageEmailService.update(+id, updateManageEmailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.manageEmailService.remove(+id);
  }
}
