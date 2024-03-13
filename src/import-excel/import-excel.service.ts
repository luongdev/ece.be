import { BadRequestException, Injectable } from '@nestjs/common';
import { ExcelService } from './excel-service.service';
import { EXCEL_INVALID } from '@/constants/errors';
import { ImportExcelEntity } from './entities/import-excel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ManageUserLocalService } from '@/manage-user-local/manage-user-local.service';

@Injectable()
export class ImportExcelService {
  constructor(
    private excelService: ExcelService,
    private manageUserLocalService: ManageUserLocalService,
    @InjectRepository(ImportExcelEntity, "db_new")
    private fileImportRepository: Repository<ImportExcelEntity>
  ) { }

  async findAll(query) {
    const { page = 1, pageSize = 10 } = query;
    const [listFile, totalFile] = await this.fileImportRepository.findAndCount({
      take: pageSize,
      skip: (page - 1) * pageSize,
      select: {},
    });
    return [listFile, totalFile];
  }

  async exportTemplate(res) {
    const file = await this.excelService.exportTemplate();
    res.set({
      'Content-Type': 'application/vnd.ms-excel',
      'Content-Disposition': `attachment;filename=File_Mau_Import_Account.xlsx`,
    });
    res.end(file);
  }

  async upload(file: Express.Multer.File, userInfo) {
    const isExcel = ['xlsx', 'xls'].includes(file.originalname.split('.').pop());
    if (!isExcel) throw new BadRequestException(EXCEL_INVALID);

    const { imports, errors } = await this.excelService.transform(file, userInfo);

    await this.manageUserLocalService.createMany(imports);

    const totalRecord = Number(imports.length) + Number(errors.length);

    await this.fileImportRepository.insert({ fileName: file.originalname, quantityRecord: totalRecord });

    return { successes: imports, fails: errors };
  }
}
