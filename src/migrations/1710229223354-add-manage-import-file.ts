import { MigrationInterface, QueryRunner } from "typeorm";

export class AddManageImportFile1710229223354 implements MigrationInterface {
    name = 'AddManageImportFile1710229223354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file_import" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_85c86f5deadeeabb86ec6c097bb" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_033d4cf0d6985213810edc67267" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_0cd45fae34c39ac4ba9a9d65496" DEFAULT getdate(), "createdBy" uniqueidentifier, "updatedBy" uniqueidentifier, "file_name" nvarchar(255) NOT NULL, "quantity_record" int NOT NULL, CONSTRAINT "PK_85c86f5deadeeabb86ec6c097bb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "file_import"`);
    }

}
