import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, Repository, In } from "typeorm";
import { fileImportEnity } from "./entities/file-import.entity";

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(fileImportEnity, "db_new")
    private fileRepository: Repository<fileImportEnity>
  ) {}

  async getListFile(getFileDto: any) {
    const { page, pageSize } = getFileDto;
    const [listFile, totalFile] = await this.fileRepository.findAndCount({
      where: {},
      take: pageSize,
      skip: (page - 1) * pageSize,
      select: {},
    });
    return [listFile, totalFile];
  }
  async addFileUpload(data: any) {
    const { nameFile, quantityRecord, date } = data;
    return this.fileRepository.insert({ nameFile, quantityRecord, date });
  }
}
