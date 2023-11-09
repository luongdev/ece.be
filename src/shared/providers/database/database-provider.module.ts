import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { DatabaseConfigService } from './database-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const dbConfigService = new DatabaseConfigService(configService);
        return ({
          type: 'mysql',
          host: dbConfigService.host,
          port: dbConfigService.port,
          username: dbConfigService.username,
          password: dbConfigService.password,
          database: dbConfigService.database,
          entities: [],
          migrations: await dbConfigService.migrations(),
          migrationsRun: true,
          autoLoadEntities: true,
        } as TypeOrmModuleAsyncOptions);
      },
    }),
  ],
  providers: [DatabaseConfigService],
})
export class DatabaseProviderModule {

}
