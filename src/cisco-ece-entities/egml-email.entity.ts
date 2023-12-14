import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { egplCasemgmtActivity } from './egpl-casemgmt-activity.entity';

@Entity({ name: 'EGML_EMAIL' })
export class egmlEmailEntity {
    @PrimaryColumn({ name: ''})
    emailId: number;

    @Column({ nullable: false })
    ACTIVITY_ID: number;

    @Column({ nullable: false })
    ALIAS_ID: number;

    @Column({ nullable: false })
    SUBJECT: string;

    @Column({ nullable: false })
    EMAIL_DATE: Date;

    @Column({ nullable: false })
    EMAIL_SIZE: number;

    @Column({ nullable: false })
    NUM_ATTACHMENTS: number;

    @Column({ nullable: true })
    CHARSET: string;

    @Column({ nullable: true })
    MESSAGE_ID: string;

    @Column({ nullable: false })
    FROM_EMAIL_ADDRESS: string;

    @Column({ nullable: false })
    RECV_EMAIL_ADDRESS: string;

    @Column({ nullable: false })
    DELETE_FLAG: string;

    @OneToOne(() => egplCasemgmtActivity, (activity) => activity.email)
    @JoinColumn({ name: 'ACTIVITY_ID', referencedColumnName: 'ACTIVITY_ID' })
    activity: egplCasemgmtActivity[];
};