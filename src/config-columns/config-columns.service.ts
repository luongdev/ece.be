import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigColumnEntity } from './entities/config-column.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConfigColumnsService {
  constructor(
    @InjectRepository(ConfigColumnEntity)
    private configColumnRepository: Repository<ConfigColumnEntity>,
  ) { }

  create(username, data) {
    return this.configColumnRepository.insert({ username, configs: data.configs });
  }

}
