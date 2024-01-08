import { Controller, Param, Get, Res } from '@nestjs/common';
import { EmailAttachmentService } from '@/email-attachment/email-attachment.service';

@Controller('/email-attachment')
export class EmailAttachmentController {
  constructor(private readonly emailAttachmentService: EmailAttachmentService) { }

  @Get('/:idFile')
  async getEmail(@Param() { idFile }) {
    return this.emailAttachmentService.findEmailAttachmentById(idFile);
  }

}
