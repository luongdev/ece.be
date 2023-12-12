import { Module } from '@nestjs/common';
import { ManageEmailService } from './manage-email.service';
import { ManageEmailController } from './manage-email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { egmlEmailEntity } from '@/cisco-ece-entities/egml-email.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      egmlEmailEntity,
    ]),
  ],
  controllers: [ManageEmailController],
  providers: [ManageEmailService]
})
export class ManageEmailModule { }
