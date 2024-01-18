import { Module } from '@nestjs/common';
import { ManageUserService } from './manage-user.service';
import { ManageUserController } from './manage-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { egplUserEntity } from '../cisco-ece-entities/egpl-user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      egplUserEntity,
    ], 'db_new'),
    TypeOrmModule.forFeature([
      egplUserEntity,
    ], 'db_old')
  ],
  controllers: [ManageUserController],
  providers: [ManageUserService],
})
export class ManageUserModule { }
