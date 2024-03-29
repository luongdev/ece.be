import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { egplCasemgmtActivityEntity } from './egpl-casemgmt-activity.entity';

@Entity({ name: 'VIEW_EGML_EMAIL_DATA' })
export class egmlEmailDataEntity {
    @PrimaryColumn({ name: 'EMAIL_ID' })
    emailId: number;

    @Column({ nullable: false, name: 'ACTIVITY_ID' })
    activityId: number;

    @Column({ nullable: false, name: 'HEADER' })
    header: string;

    @Column({ nullable: false, name: 'CONTENT' })
    content: string;

    @Column({ nullable: false, name: 'CONTENT_TYPE' })
    contentType: string;

    @OneToOne(() => egplCasemgmtActivityEntity, (activity) => activity.emailData)
    @JoinColumn({ name: 'ACTIVITY_ID', referencedColumnName: 'activityId' })
    activity: egplCasemgmtActivityEntity;
}