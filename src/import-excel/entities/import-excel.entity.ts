import { BaseEntity } from "../../shared/providers/database/common/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: "file_import" })
export class ImportExcelEntity extends BaseEntity {
    @Column({ name: "file_name" })
    fileName: string;

    @Column({ name: "quantity_record" })
    quantityRecord: number;
}