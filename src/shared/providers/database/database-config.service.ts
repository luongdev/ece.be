import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { join } from 'path';
import { existsSync, readdirSync } from 'fs';

@Injectable()
export class DatabaseConfigService {
  constructor(private readonly _configService: ConfigService) {
  }

  get type(): string {
    return this._configService.get<string>('DB_TYPE');
  }

  get host(): string {
    return this._configService.get<string>('DB_HOST');
  }

  get port(): number {
    return this._configService.get<number>('DB_PORT');
  }

  get username(): string {
    return this._configService.get<string>('DB_USERNAME');
  }

  get password(): string {
    return this._configService.get<string>('DB_PASSWORD');
  }

  get database(): string {
    return this._configService.get<string>('DB_DATABASE');
  }

  get entities(): string[] {
    const entitiesPath = join(process.cwd(), 'src', 'entities');

    const entities = [entitiesPath + '/*.entity.{ts,js}'];

    console.log('entities: ', entities);

    return entities;
  }

  async migrations() {
    let migrations = [];
    const migrationsDir = join(process.cwd(), 'migrations');

    if (!existsSync(migrationsDir)) return migrations;

    const migrationFiles = readdirSync(migrationsDir)
      .filter(f => f.endsWith('.js') && !f.endsWith('d.js'));

    for (const file of migrationFiles) {
      const migrationClass = await import(`${migrationsDir}/${file}`);
      migrations = [ ...migrations, ...Object.values(migrationClass) ];
    }

    return migrations;
  }
}
