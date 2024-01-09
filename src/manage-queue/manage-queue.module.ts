import { Module } from '@nestjs/common';
import { ManageQueueService } from './manage-queue.service';
import { ManageQueueController } from './manage-queue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { egplRoutingQueueEntity } from '../cisco-ece-entities/egpl-routing-queue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      egplRoutingQueueEntity,
    ])
  ],
  controllers: [ManageQueueController],
  providers: [ManageQueueService]
})
export class ManageQueueModule { }
