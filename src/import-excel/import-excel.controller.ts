import { Controller, Get, Post, Res, UseInterceptors, UploadedFile, Query, Req } from '@nestjs/common';
import { ImportExcelService } from './import-excel.service';
import { ApiBearerAuth, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('import-excel')
@ApiBearerAuth()
export class ImportExcelController {
  constructor(private readonly importExcelService: ImportExcelService) { }

  @Get()
  findAll(@Query() query: any) {
    return this.importExcelService.findAll(query);
  }

  @Get('/template')
  @ApiOperation({ description: 'Download template for upload sim for campaign' })
  getTemplate(@Res() res) {
    return this.importExcelService.exportTemplate(res);
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const userInfo = req.user;
    return this.importExcelService.upload(file, userInfo);
  }
}
