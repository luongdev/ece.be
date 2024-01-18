import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// import { join } from 'path';
// import { existsSync, readdirSync } from 'fs';

@Injectable()
export class DatabaseConfigOldService {
    constructor(private readonly _configService: ConfigService) {
    }

    get typeOld(): string {
        return this._configService.get<string>('DB_TYPE_OLD');
    }

    get hostOld(): string {
        return this._configService.get<string>('DB_HOST_OLD');
    }

    get portOld(): number {
        return this._configService.get<number>('DB_PORT_OLD');
    }

    get usernameOld(): string {
        return this._configService.get<string>('DB_USERNAME_OLD');
    }

    get passwordOld(): string {
        return this._configService.get<string>('DB_PASSWORD_OLD');
    }

    get databaseOld(): string {
        return this._configService.get<string>('DB_DATABASE_OLD');
    }

    // async migrations() {
    //     let migrations = [];
    //     const migrationsDir = process.env.PATH_MIGRATION ? process.env.PATH_MIGRATION : join(process.cwd(), 'dist', 'src', 'migrations');

    //     if (!existsSync(migrationsDir)) return migrations;

    //     const migrationFiles = readdirSync(migrationsDir)
    //         .filter(f => f.endsWith('.js') && !f.endsWith('d.js'));

    //     for (const file of migrationFiles) {
    //         const migrationClass = await import(`${migrationsDir}/${file}`);
    //         migrations = [...migrations, ...Object.values(migrationClass)];
    //     }

    //     return migrations;
    // }
}
