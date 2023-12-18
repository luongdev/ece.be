import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { egmlEmailAttachmentEntity } from '@/cisco-ece-entities/egml-email-attachment.entity';

@Injectable()
export class EmailAttachmentService {

  // onApplicationBootstrap(): any {
  //   this.addEmailAttachment();
  // }
  constructor(
        @InjectRepository(egmlEmailAttachmentEntity)
        private emailAttachmentRepository: Repository<egmlEmailAttachmentEntity>,
  ) {
  }

  async findEmailAttachmentById(id: number) {
    return await this.emailAttachmentRepository.findOneBy({ id: id });
  }

  // async addEmailAttachment() {
  //   const content = await fs.readFileSync('./upload/HexaDash.pdf');
  //   const emailADD : EmailAttachment = await this.emailAttachmentRepository.findOneBy({ id: Number(29608) });
  //   emailADD.content = content;
  //   emailADD.fileName = 'image.pdf';
  //   emailADD.contentType='pdf';
  //   return await this.emailAttachmentRepository.save(emailADD);
  // }
}
