import { Injectable } from '@nestjs/common';
import { CreateManageEmailDto } from './dto/create-manage-email.dto';
import { UpdateManageEmailDto } from './dto/update-manage-email.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { egmlEmailEntity } from '@/cisco-ece-entities/egml-email.entity';

@Injectable()
export class ManageEmailService {
  constructor(
    @InjectRepository(egmlEmailEntity)
    private egmlEmailRepository: Repository<egmlEmailEntity>,
  ) { }
  create(createManageEmailDto: CreateManageEmailDto) {
    return 'This action adds a new manageEmail';
  }

  getListEmail() {
    return this.egmlEmailRepository.createQueryBuilder('activity').leftJoinAndSelect('at.activity', 'activity').getMany();;
  }

  findOne(id: number) {
    return `This action returns a #${id} manageEmail`;
  }

  update(id: number, updateManageEmailDto: UpdateManageEmailDto) {
    return `This action updates a #${id} manageEmail`;
  }

  remove(id: number) {
    return `This action removes a #${id} manageEmail`;
  }
}
