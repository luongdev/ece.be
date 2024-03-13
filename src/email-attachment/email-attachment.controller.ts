import { Controller, Param, Get, Query } from '@nestjs/common';
import { EmailAttachmentService } from '@/email-attachment/email-attachment.service';

@Controller('/email-attachment')
export class EmailAttachmentController {
  constructor(private readonly emailAttachmentService: EmailAttachmentService) { }

  @Get('/:idFile')
  async getEmail(@Param() { idFile }, @Query('system') system) {
    return this.emailAttachmentService.findEmailAttachmentById(idFile, system);
  }

}
