import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'EGML_CASEMGMT_ACTIVITY_9000' })
export class egmlCasemgmtActivity {
    @PrimaryColumn()
    ACTIVITY_ID: number;

    @Column({ nullable: true })
    CASE_ID: number;

    @Column({ nullable: true })
    DEPARTMENT_ID: number;

    @Column({ nullable: true })
    ACTIVITY_MODE: number;

    @Column({ nullable: false })
    ACTIVITY_TYPE: number;

    @Column({ nullable: false })
    ACTIVITY_SUB_TYPE: number;

    @PrimaryColumn()
    @Column({ nullable: false })
    ACTIVITY_STATUS: number;

    @Column({ nullable: false })
    ACTIVITY_SUB_STATUS: number;

    @Column({ nullable: true })
    ACTIVITY_PRIORITY: number;

    @Column({ nullable: false })
    WHEN_CREATED: Date;

    @Column({ nullable: false })
    WHO_CREATED: number;

    @Column({ nullable: true })
    WHEN_MODIFIED: Date;

    @Column({ nullable: true })
    DUE_DATE: Date;

    @Column({ nullable: true })
    USER_LAST_WORKED: number;

    @Column({ nullable: true })
    ASSIGNED_TO: number;

    @Column({ nullable: true })
    SUBJECT: string;

    @Column({ nullable: true })
    DESCRIPTION: string;

    @Column({ nullable: true })
    LANGUAGE_ID: number;

    @Column({ nullable: true })
    CUSTOMER_ID: number;

    @Column({ nullable: true })
    CONTACT_PERSON_ID: number;

    @Column({ nullable: true })
    QUEUE_ID: number;

    @Column({ nullable: true })
    CONTACT_POINT_ID: number;

    @Column({ nullable: true })
    CONTACT_POINT_DATA: string;

    @Column({ nullable: true })
    LAST_ACTION_REASON: string;

    @Column({ nullable: false })
    PINNED: string;

    @Column({ nullable: false })
    LOCKED: string;

    @Column({ nullable: false })
    ACTIVITY_ACCESS: number;

    @Column({ nullable: true })
    FOLDER_ID: number;

    @Column({ nullable: true })
    LAST_DEPARTMENT_ID: number;

    @Column({ nullable: false })
    SAVE_DRAFT_FLAG: number;

    @Column({ nullable: true })
    LEAVE_OPEN_FLAG: number;

    @Column({ nullable: true })
    NUM_NOTES: number;

    @Column({ nullable: true })
    NUM_ATTACHMENTS: number;

    @Column({ nullable: true })
    CASE_TYPE: number;

    @Column({ nullable: false })
    DELETE_FLAG: string;

    @Column({ nullable: true })
    CONFERENCE_FLAG: string;

    @Column({ nullable: true })
    IS_ESCALATED: string;

    @Column({ nullable: false })
    OUTBOUND_FAILED: number;

    @Column({ nullable: true })
    VISITOR_SESSION_ID: string;

    @Column({ nullable: true })
    VISITOR_USER_ID: string;

    @Column({ nullable: true })
    CUST_ACCOUNT_ID: string;

    @Column({ nullable: true })
    DELAY_TIME_IN_MIN: number;

    @Column({ nullable: true })
    ISSUE_TYPE_ID: number;
};