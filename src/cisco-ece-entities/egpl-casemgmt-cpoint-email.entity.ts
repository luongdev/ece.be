import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'EGPL_CASEMGMT_CPOINT_EMAIL' })
export class egplCasemgmtCpointEmail {
    @PrimaryColumn({ name: 'CONTACT_POINT_ID' })
    contactPointId: number;

    @Column({ nullable: false, name: 'DEPARTMENT_ID' })
    departmentId: number;

    @Column({ nullable: false, name: 'EMAIL_ADDRESS' })
    emailAddress: number;

    @Column({ nullable: true, name: 'WHENMODIFIED' })
    whenModified: string;
}