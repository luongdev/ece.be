import { MigrationInterface, QueryRunner } from "typeorm";
import { ROLE, TYPE } from "@/manage-user-local/constant";
const crypto = require("crypto");
const password = crypto
    .createHash("sha256")
    .update('123456aA@')
    .digest("hex");

export class AddManageUserLocal1710150510217 implements MigrationInterface {
    name = 'AddManageUserLocal1710150510217';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_local" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_cdc2151f083ffbe7487fedb4322" DEFAULT NEWSEQUENTIALID(), "createdAt" datetime2 NOT NULL CONSTRAINT "DF_b28dc474a6d6e26ebdf74b356b1" DEFAULT getdate(), "updatedAt" datetime2 NOT NULL CONSTRAINT "DF_829903bb45f545b8ed1c1aa22d1" DEFAULT getdate(), "createdBy" uniqueidentifier, "updatedBy" uniqueidentifier, "username" nvarchar(255) NOT NULL, "type" int CONSTRAINT CHK_309af14d71abd9487a26f08644_ENUM CHECK(type IN ('1','2')) NOT NULL, "password" nvarchar(255) NOT NULL, "role" int CONSTRAINT CHK_17daa4978752c64aedde95a14e_ENUM CHECK(role IN ('2','1','3')) NOT NULL, CONSTRAINT "UQ_6376149b20c913e35fc935b3adb" UNIQUE ("username"), CONSTRAINT "PK_cdc2151f083ffbe7487fedb4322" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6376149b20c913e35fc935b3ad" ON "users_local" ("username") `);
        await queryRunner.query(`CREATE INDEX "IDX_4a61e1d7675002214d0fc81842" ON "users_local" ("type") `);
        await queryRunner.query(`
            INSERT INTO users_local (username, password,type,role) VALUES ('admin', '${password}',${TYPE.LOCAL},${ROLE.ALL});
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_4a61e1d7675002214d0fc81842" ON "users_local"`);
        await queryRunner.query(`DROP INDEX "IDX_6376149b20c913e35fc935b3ad" ON "users_local"`);
        await queryRunner.query(`DROP TABLE "users_local"`);
    }

}
