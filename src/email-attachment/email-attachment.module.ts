import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailAttachmentService } from '@/email-attachment/email-attachment.service';
import { EmailAttachmentController } from '@/email-attachment/email-attachment.controller';
import { egmlEmailAttachmentEntity } from '@/cisco-ece-entities/egml-email-attachment.entity';
import { LoggerProviderModule } from '@/shared/providers';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      egmlEmailAttachmentEntity,
    ]),
    LoggerProviderModule
  ],
  controllers: [EmailAttachmentController],
  providers: [EmailAttachmentService],
  exports: [EmailAttachmentService],
})
export class EmailAttachmentModule {
}
