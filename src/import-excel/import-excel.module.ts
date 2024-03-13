import { Module } from '@nestjs/common';
import { ImportExcelService } from './import-excel.service';
import { ImportExcelController } from './import-excel.controller';
import { ExcelService } from './excel-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersLocalEntity } from '@/manage-user-local/entities/manage-user-local.entity';
import { ManageUserLocalModule } from '@/manage-user-local/manage-user-local.module';
import { ImportExcelEntity } from './entities/import-excel.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersLocalEntity, ImportExcelEntity], "db_new"),
    ManageUserLocalModule
  ],
  controllers: [ImportExcelController],
  providers: [ImportExcelService, ExcelService]
})
export class ImportExcelModule { }
