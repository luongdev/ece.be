import { Module } from '@nestjs/common';
import { ManageEmailService } from './manage-email.service';
import { ManageEmailController } from './manage-email.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { egmlEmailEntity } from '@/cisco-ece-entities/egml-email.entity';
import { egplCasemgmtActivity } from '@/cisco-ece-entities/egpl-casemgmt-activity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      egmlEmailEntity,
      egplCasemgmtActivity
    ]),
  ],
  controllers: [ManageEmailController],
  providers: [ManageEmailService]
})
export class ManageEmailModule { }
