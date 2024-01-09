import { egplRoutingQueueEntity } from '../cisco-ece-entities/egpl-routing-queue.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ManageQueueService {
  constructor(
    @InjectRepository(egplRoutingQueueEntity)
    private egplRoutingQueueRepository: Repository<egplRoutingQueueEntity>,
  ) { }

  getList() {
    return this.egplRoutingQueueRepository.find({
      select: {
        queueId: true,
        queueName: true
      }
    });
  }

}
