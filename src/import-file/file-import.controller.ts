import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { FileService } from "./file-import.service";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get("/")
  getListFile(@Query() getFileDto: any) {
    return this.fileService.getListFile(getFileDto);
  }
  @Post("/")
  addFileUpload(@Body() body: any) {
    const { data } = body;
    return this.fileService.addFileUpload(data);
  }
}
