import { egplUserEntity } from '@/cisco-ece-entities/egpl-user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ManageUserService {
  constructor(
    @InjectRepository(egplUserEntity)
    private egplUserRepository: Repository<egplUserEntity>,
  ) { }

  getList() {
    return this.egplUserRepository.find({
      select: {
        userId: true,
        userName: true
      }
    });
  }

}
