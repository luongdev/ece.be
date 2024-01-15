import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1704731787374 implements MigrationInterface {
    name = 'InitMigration1704731787374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "base_entity" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_03e6c58047b7a4b3f6de0bfa8d7" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_e4e1b9afb4ee5eae3c081579d09" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_834d55ad4e3424101fb5842adfc" DEFAULT getdate(), "createdBy" uniqueidentifier, "updatedBy" uniqueidentifier, CONSTRAINT "PK_03e6c58047b7a4b3f6de0bfa8d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_token" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_b575dd3c21fb0831013c909e7fe" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_6f83e7d97f3565799a21ade4d40" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_db8bd0996c076e20953a62d762e" DEFAULT getdate(), "createdBy" uniqueidentifier, "updatedBy" uniqueidentifier, "username" nvarchar(255) NOT NULL, "refreshToken" nvarchar(255) NOT NULL, CONSTRAINT "UQ_fdf0cae2ed6183bc794e391981c" UNIQUE ("username"), CONSTRAINT "UQ_428e14ded7299edfcf58918beaf" UNIQUE ("refreshToken"), CONSTRAINT "PK_b575dd3c21fb0831013c909e7fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fdf0cae2ed6183bc794e391981" ON "refresh_token" ("username") `);
        await queryRunner.query(`CREATE INDEX "IDX_428e14ded7299edfcf58918bea" ON "refresh_token" ("refreshToken") `);
        await queryRunner.query(`CREATE TABLE "config_columns" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_f93bb2d2e9f8b0596d3f46df450" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_52bd58dd1dd9635a00ed36db7f7" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_0d88bffc66b02db43e9d6111d33" DEFAULT getdate(), "createdBy" uniqueidentifier, "updatedBy" uniqueidentifier, "username" nvarchar(255) NOT NULL, "configs" nvarchar(1000) NOT NULL, CONSTRAINT "UQ_d1968427166d942c239f1a1c514" UNIQUE ("username"), CONSTRAINT "PK_f93bb2d2e9f8b0596d3f46df450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d1968427166d942c239f1a1c51" ON "config_columns" ("username") `);
        await queryRunner.query(`CREATE INDEX "IDX_7b9554d5daebe3fa12dd26d692" ON "config_columns" ("configs") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_7b9554d5daebe3fa12dd26d692" ON "config_columns"`);
        await queryRunner.query(`DROP INDEX "IDX_d1968427166d942c239f1a1c51" ON "config_columns"`);
        await queryRunner.query(`DROP TABLE "config_columns"`);
        await queryRunner.query(`DROP INDEX "IDX_428e14ded7299edfcf58918bea" ON "refresh_token"`);
        await queryRunner.query(`DROP INDEX "IDX_fdf0cae2ed6183bc794e391981" ON "refresh_token"`);
        await queryRunner.query(`DROP TABLE "refresh_token"`);
        await queryRunner.query(`DROP TABLE "base_entity"`);
    }

}
