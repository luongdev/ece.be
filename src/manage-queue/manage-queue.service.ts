import { TYPE_SYSTEM } from '@/constants';
import { egplRoutingQueueEntity } from '../cisco-ece-entities/egpl-routing-queue.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ManageQueueService {
  constructor(
    @InjectRepository(egplRoutingQueueEntity, 'db_new')
    private egplRoutingQueueNewRepository: Repository<egplRoutingQueueEntity>,
    @InjectRepository(egplRoutingQueueEntity, 'db_old')
    private egplRoutingQueueOldRepository: Repository<egplRoutingQueueEntity>,
  ) { }

  getList(system) {
    if (system == TYPE_SYSTEM.NEW) {
      return this.egplRoutingQueueNewRepository.find({
        select: {
          queueId: true,
          queueName: true
        }
      });
    } else {
      return this.egplRoutingQueueOldRepository.find({
        select: {
          queueId: true,
          queueName: true
        }
      });
    }
  }

}
