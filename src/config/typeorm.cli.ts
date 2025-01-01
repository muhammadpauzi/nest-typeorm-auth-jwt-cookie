// for typeorm migration
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig();

const config = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: ['/src/**/*.entity{.ts,.js}'],
  migrations: [
    join(__dirname, './../build/database/migrations/*{.ts,.js}'),
    join(__dirname, './../database/migrations/*{.ts,.js}'),
  ],
  autoLoadEntities: true,
  synchronize: false,
} as DataSourceOptions;
export const connectionSource = new DataSource(config);
