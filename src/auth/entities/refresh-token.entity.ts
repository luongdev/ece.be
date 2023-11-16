import { BaseEntity } from '../../shared/providers/database/common/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'refresh_token' })
export class RefreshTokenEntity extends BaseEntity {
    @Index()
    @Column({ unique: true })
    username: string;

    @Index()
    @Column({ unique: true })
    refreshToken: string;
};