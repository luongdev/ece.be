import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// import { join } from 'path';
// import { existsSync, readdirSync } from 'fs';

@Injectable()
export class DatabaseConfigNewService {
  constructor(private readonly _configService: ConfigService) {
  }

  get typeNew(): string {
    return this._configService.get<string>('DB_TYPE_NEW');
  }

  get hostNew(): string {
    return this._configService.get<string>('DB_HOST_NEW');
  }

  get portNew(): number {
    return this._configService.get<number>('DB_PORT_NEW');
  }

  get usernameNew(): string {
    return this._configService.get<string>('DB_USERNAME_NEW');
  }

  get passwordNew(): string {
    return this._configService.get<string>('DB_PASSWORD_NEW');
  }

  get databaseNew(): string {
    return this._configService.get<string>('DB_DATABASE_NEW');
  }

  // async migrations() {
  //   let migrations = [];
  //   const migrationsDir = process.env.PATH_MIGRATION ? process.env.PATH_MIGRATION : join(process.cwd(), 'dist', 'src', 'migrations');

  //   if (!existsSync(migrationsDir)) return migrations;

  //   const migrationFiles = readdirSync(migrationsDir)
  //     .filter(f => f.endsWith('.js') && !f.endsWith('d.js'));

  //   for (const file of migrationFiles) {
  //     const migrationClass = await import(`${migrationsDir}/${file}`);
  //     migrations = [...migrations, ...Object.values(migrationClass)];
  //   }

  //   return migrations;
  // }
}
