import { BaseEntity } from "../../shared/providers/database/common/base.entity";
import { Column, Entity, Index, PrimaryColumn } from "typeorm";

@Entity({ name: "file_import" })
export class fileImportEnity extends BaseEntity {
  @Column({ name: "name_file" })
  nameFile: string;

  @Column({ name: "quantity_record" })
  quantityRecord: number;

  @Column({ name: "date" })
  date: Date;
}
