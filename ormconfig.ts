import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export default new DataSource({
  type: 'mssql',
  host: configService.get<string>('DB_HOST_NEW'),
  port: Number(configService.get<number>('DB_PORT_NEW')),
  username: configService.get<string>('DB_USERNAME_NEW'),
  password: configService.get<string>('DB_PASSWORD_NEW'),
  database: configService.get('DB_DATABASE_NEW'),
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['./src/migrations/*.ts'],
  extra: {
    trustServerCertificate: true,
  }
});
