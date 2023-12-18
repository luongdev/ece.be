import { Controller, Param, Get, Res } from '@nestjs/common';
import { EmailAttachmentService } from '@/email-attachment/email-columns.service';

import { Response } from 'express';

@Controller('/email-attachment')
export class EmailAttachmentController {
  constructor(private readonly emailAttachmentService: EmailAttachmentService) { }

  @Get('/:idFile')
  async getEmail(@Res() res: Response, @Param() param)  {
    const email = await this.emailAttachmentService.findEmailAttachmentById(param.idFile);
    res.set (
      {
        'Content-Type': `${email.contentType}`,
        'Content-Disposition': `attachment; filename=${email.fileName}`,
      }
    );
    return res.send(email.content);
  }
}
