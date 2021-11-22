import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserSubscriber } from './src/entity-subscribers/user-subscriber';

const configs: TypeOrmModuleOptions & { seeds: string[] } = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  subscribers: [UserSubscriber],
  // factories: ['src/database/factories/**/*.{.ts,.js}'],
};

module.exports = configs;
