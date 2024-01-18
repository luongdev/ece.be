import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseConfigNewService } from './database-config-new.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseConfigOldService } from './database-config-old.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'db_new',
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfigService = new DatabaseConfigNewService(configService);
        return ({
          type: 'mssql',
          host: dbConfigService.hostNew,
          port: Number(dbConfigService.portNew),
          username: dbConfigService.usernameNew,
          password: dbConfigService.passwordNew,
          database: dbConfigService.databaseNew,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          extra: {
            trustServerCertificate: true,
            options: {
              encrypt: false
            },
          },
          autoLoadEntities: true,
          // migrations: await dbConfigService.migrations(),
          // migrationsRun: true,
          // logging: true
        } as TypeOrmModuleAsyncOptions);
      },
    }),
    TypeOrmModule.forRootAsync({
      name: 'db_old',
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfigService = new DatabaseConfigOldService(configService);
        return ({
          type: 'mssql',
          host: dbConfigService.hostOld,
          port: Number(dbConfigService.portOld),
          username: dbConfigService.usernameOld,
          password: dbConfigService.passwordOld,
          database: dbConfigService.databaseOld,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          extra: {
            trustServerCertificate: true,
            options: {
              encrypt: false
            },
          },
          autoLoadEntities: true,
          // migrations: await dbConfigService.migrations(),
          // migrationsRun: true,
          // logging: true
        } as TypeOrmModuleAsyncOptions);
      },
    }),
  ],
  providers: [DatabaseConfigNewService, DatabaseConfigOldService],
})
export class DatabaseProviderModule { }
