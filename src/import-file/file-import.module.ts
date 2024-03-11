import { Module } from "@nestjs/common";
import { FileService } from "./file-import.service";
import { FileController } from "./file-import.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { fileImportEnity } from "./entities/file-import.entity";

@Module({
  imports: [TypeOrmModule.forFeature([fileImportEnity], "db_new")],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
