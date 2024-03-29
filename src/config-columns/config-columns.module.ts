import { Module } from '@nestjs/common';
import { ConfigColumnsService } from './config-columns.service';
import { ConfigColumnsController } from './config-columns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigColumnEntity } from './entities/config-column.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConfigColumnEntity,
    ], 'db_new'),
  ],
  controllers: [ConfigColumnsController],
  providers: [ConfigColumnsService],
  exports: [ConfigColumnsService]
})
export class ConfigColumnsModule { }
