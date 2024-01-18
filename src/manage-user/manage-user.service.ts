import { egplUserEntity } from '../cisco-ece-entities/egpl-user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TYPE_SYSTEM } from '@/constants';

@Injectable()
export class ManageUserService {
  constructor(
    @InjectRepository(egplUserEntity, 'db_new')
    private egplUserNewRepository: Repository<egplUserEntity>,
    @InjectRepository(egplUserEntity, 'db_old')
    private egplUserOldRepository: Repository<egplUserEntity>,
  ) { }

  getList(system) {
    if (system == TYPE_SYSTEM.NEW) {
      return this.egplUserNewRepository.find({
        select: {
          userId: true,
          userName: true
        }
      });
    } else {
      return this.egplUserOldRepository.find({
        select: {
          userId: true,
          userName: true
        }
      });
    }
  }
}
