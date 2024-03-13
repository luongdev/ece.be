import { BaseEntity } from '../../shared/providers/database/common/base.entity';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { ROLE, TYPE } from '../constant';

@Entity({ name: 'users_local' })
export class UsersLocalEntity extends BaseEntity {
    @Index()
    @Column({ unique: true })
    username: string;

    @Index()
    @Column({ enum: [TYPE.SSO, TYPE.LOCAL] })
    type: number;

    @Column()
    password: string;

    @Column({ enum: [ROLE.ADMIN, ROLE.USER, ROLE.ALL] })
    role: number;

    @OneToOne(() => UsersLocalEntity, (usr) => usr.id)
    @JoinColumn({ name: 'createdBy', referencedColumnName: 'id' })
    createdByInfo: UsersLocalEntity;

    @OneToOne(() => UsersLocalEntity, (usr) => usr.id)
    @JoinColumn({ name: 'updatedBy', referencedColumnName: 'id' })
    updatedByInfo: UsersLocalEntity;
};