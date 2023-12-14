import { egplCasemgmtActivity } from '@/cisco-ece-entities/egpl-casemgmt-activity.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ManageEmailService {
  constructor(
    @InjectRepository(egplCasemgmtActivity)
    private egplCasemgmtActivityRepository: Repository<egplCasemgmtActivity>,
  ) { }

  async getListEmail() {
    const listMail = await this.egplCasemgmtActivityRepository.find({
      select: {
        email: {
          ACTIVITY_ID: true,
          FROM_EMAIL_ADDRESS: true,
          RECV_EMAIL_ADDRESS: true
        },
        ACTIVITY_ID: true,
        SUBJECT: true,
        ASSIGNED_TO: true,
        WHEN_CREATED: true,
        ACTIVITY_SUB_STATUS: true,
        CASE_ID: true,
        QUEUE_ID: true,
        NUM_ATTACHMENTS: true,
        ACTIVITY_PRIORITY: true,
        ACTIVITY_TYPE: true,
        ACTIVITY_MODE: true
      }, relations: ['email']
    });
    return listMail;
  }
}
