import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigColumnEntity } from './entities/config-column.entity';
import { Repository } from 'typeorm';
import { CreateConfigColumnDto } from './dto/create-config-columns.dto';

@Injectable()
export class ConfigColumnsService {
  constructor(
    @InjectRepository(ConfigColumnEntity)
    private configColumnRepository: Repository<ConfigColumnEntity>,
  ) { }

  async create(username: string, body: CreateConfigColumnDto) {
    const { config } = body;
    const checkExistConfig = await this.findConfigByUserName(username);
    if (!checkExistConfig) return this.configColumnRepository.insert({ username, configs: JSON.stringify(config) });
    checkExistConfig.configs = JSON.stringify(config);
    checkExistConfig.updatedAt = new Date();
    return this.configColumnRepository.save(checkExistConfig);
  }

  async findConfigByUserName(username: string) {
    return this.configColumnRepository.findOneBy({ username: username });
  }

}
