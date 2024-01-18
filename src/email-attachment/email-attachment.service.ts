import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { egmlEmailAttachmentEntity } from "../cisco-ece-entities/egml-email-attachment.entity";
import { NOT_FIND_ACTIVITY } from '@/constants/errors';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from '@/shared/logging/logger.service';
import { LoggerFactory } from '@/shared/providers/logger/logger.factory';
import axios from 'axios';
const https = require('https');
import * as path from 'path';
import { TYPE_SYSTEM } from '@/constants';

@Injectable()
export class EmailAttachmentService {
  private urlCisco: string;
  private readonly _log: LoggerService;
  constructor(
    @InjectRepository(egmlEmailAttachmentEntity, 'db_new')
    private emailAttachmentNewRepository: Repository<egmlEmailAttachmentEntity>,
    @InjectRepository(egmlEmailAttachmentEntity, 'db_old')
    private emailAttachmentOldRepository: Repository<egmlEmailAttachmentEntity>,
    private configService: ConfigService,
    loggerFactory: LoggerFactory,
  ) {
    this._log = loggerFactory.createLogger(EmailAttachmentService);
  }

  async findEmailAttachmentById(id: number, system) {
    try {
      let findInfo;
      const objectQuery = {
        where: { id: id },
        select: {
          id: true, fileName: true,
          attachmentLink: {
            emailId: true,
            email: {
              emailId: true,
              activityId: true
            }
          }
        },
        relations: ['attachmentLink', 'attachmentLink.email']
      };
      if (system == TYPE_SYSTEM.NEW) {
        findInfo = await this.emailAttachmentNewRepository.findOne(objectQuery);
        this.urlCisco = this.configService.get('URL_CISCO_NEW');
      } else {
        findInfo = await this.emailAttachmentOldRepository.findOne(objectQuery);
        this.urlCisco = this.configService.get('URL_CISCO_OLD');
      }

      const activityId = findInfo?.attachmentLink?.email?.activityId;
      if (!activityId) throw new BadRequestException(NOT_FIND_ACTIVITY);
      // request to cisco get Link
      const data = {
        "userName": "agenttestece",
        "password": "Test@123"
      };
      const httpsAgent = new https.Agent({
        rejectUnauthorized: false
      });
      const getToken = await axios.post(`${this.urlCisco}/system/ws/v12/authentication/user/login?forceLogin=yes`, data, { httpsAgent });
      this._log.debug(`'x-egain-session' is ${getToken?.headers['x-egain-session']}`);

      const headers = { 'X-egain-session': getToken?.headers['x-egain-session'] };
      const getContentUrl = await axios.get(`${this.urlCisco}/system/ws/v12/interaction/activity/${activityId}/attachment/${id}?$attribute=contentUrl`, { httpsAgent, headers });

      this._log.debug(`'contentUrl' is ${getContentUrl.data.attachment[0].contentUrl}`);

      return { url: path.join(this.urlCisco, getContentUrl.data.attachment[0].contentUrl), fileName: findInfo.fileName };
      // return { url: "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Arsenal_FC.svg/1200px-Arsenal_FC.svg.png", fileName: findInfo.fileName };

    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
