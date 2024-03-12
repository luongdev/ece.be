import { BaseEntity } from '../../shared/providers/database/common/base.entity';
import { Column, Entity, Index } from 'typeorm';
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
};