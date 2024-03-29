import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { egplCasemgmtActivityEntity } from "./egpl-casemgmt-activity.entity";

@Entity({ name: 'VIEW_EGPL_CASEMGMT_CPOINT_EMAIL' })
export class egplCasemgmtCpointEmailEntity {
    @PrimaryColumn({ name: 'CONTACT_POINT_ID' })
    contactPointId: number;

    @Column({ nullable: false, name: 'DEPARTMENT_ID' })
    departmentId: number;

    @Column({ nullable: false, name: 'EMAIL_ADDRESS' })
    emailAddress: number;

    @Column({ nullable: true, name: 'WHENMODIFIED' })
    whenModified: string;

    @OneToOne(() => egplCasemgmtActivityEntity, (activity) => activity.contactPoint)
    @JoinColumn({ name: 'CONTACT_POINT_ID', referencedColumnName: 'contactPointId' })
    activity: egplCasemgmtActivityEntity;

}