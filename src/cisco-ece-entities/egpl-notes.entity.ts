import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { egplCasemgmtActivity } from "@/cisco-ece-entities/egpl-casemgmt-activity.entity";
import { egplUserEntity } from "@/cisco-ece-entities/egpl-user.entity";
import { egplCasemgmtCaseEntity } from "@/cisco-ece-entities/egpl-casemgmt-case.entity";

@Entity({ name: "EGPL_NOTES" })
export class egplNotesEntity {
  @PrimaryColumn({ name: "NOTE_ID" })
  noteId: number;

  @Column({ nullable: true, name: "NOTE_OF_ID" })
  noteOfId: number;

  @Column({ nullable: true, name: "NOTE_NAME" })
  noteName: string;

  @Column({ nullable: false, name: "NOTE_TYPE" })
  noteType: string;

  @Column({ nullable: false, name: "NOTE_ACCESS" })
  noteAccess: string;

  @Column({ nullable: true, name: "NOTE_DATA" })
  noteData: string;

  @Column({ nullable: false, name: "WHO_CREATED" })
  whoCreated: number;

  @Column({ nullable: false, name: "WHEN_CREATED" })
  whenCreated: Date;

  @Column({ nullable: false, name: "DELETE_FLAG" })
  deleteFlag: string;

  @Column({ nullable: true, name: "PARENT_NOTE_ID" })
  parentNoteId: number;

  @ManyToOne(() => egplCasemgmtActivity, (activity) => activity.notes, {
    lazy: true,
  })
  @JoinColumn({
    name: "NOTE_OF_ID",
    referencedColumnName: "activityId",
  })
  activity: egplCasemgmtActivity;

  @ManyToOne(() => egplCasemgmtCaseEntity, (c) => c.notes, { lazy: true })
  @JoinColumn({
    name: "NOTE_OF_ID",
    referencedColumnName: "caseId",
  })
  case: egplCasemgmtCaseEntity;

  @ManyToOne(() => egplUserEntity, (user) => user.note)
  @JoinColumn({ name: "WHO_CREATED", referencedColumnName: "userId" })
  user: egplUserEntity;
}
