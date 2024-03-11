import { BaseEntity } from "../../shared/providers/database/common/base.entity";
import { Column, Entity, Index } from "typeorm";

@Entity({ name: "manage_user_local" })
export class manageUserLocalEntity extends BaseEntity {
  @Column({ name: "name" })
  name: string;

  @Column({ name: "type" })
  type: string;

  @Column({ name: "role" })
  role: string;

  @Column({ name: "password" })
  password: string;

  @Column({ name: "owner" })
  owner: string;
}
