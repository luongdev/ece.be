import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { egmlEmailAttachmentEntity } from "@/cisco-ece-entities/egml-email-attachment.entity";

@Injectable()
export class EmailAttachmentService {
  constructor(
    @InjectRepository(egmlEmailAttachmentEntity)
    private emailAttachmentRepository: Repository<egmlEmailAttachmentEntity>
  ) {}

  async findEmailAttachmentById(id: number) {
    return await this.emailAttachmentRepository.findOneBy({ id: id });
  }
}
