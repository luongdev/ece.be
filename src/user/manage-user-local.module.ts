import { Module } from "@nestjs/common";
import { ManageUserLocalService } from "./manage-user-local.service";
import { ManageUserLocalController } from "./manage-user-local.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { manageUserLocalEntity } from "./entities/manage-user-local.entity";

@Module({
  imports: [TypeOrmModule.forFeature([manageUserLocalEntity], "db_new")],
  controllers: [ManageUserLocalController],
  providers: [ManageUserLocalService],
  exports: [ManageUserLocalService],
})
export class ManageUserLocalModule {}
