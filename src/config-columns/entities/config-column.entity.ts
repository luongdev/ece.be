import { BaseEntity } from '../../shared/providers/database/common/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'config_columns' })
export class ConfigColumnEntity extends BaseEntity {
    @Index()
    @Column({ unique: true })
    username: string;

    @Index()
    @Column({ length: 1000 })
    configs: string;
};