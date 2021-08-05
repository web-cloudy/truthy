import { ConnectionOptions } from 'typeorm';
import * as config from 'config';

const dbConfig = config.get('db');
const ormConfig: ConnectionOptions = {
  type: process.env.DB_TYPE || dbConfig.type,
  host: process.env.DB_HOST || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_DATABASE_NAME || dbConfig.database,
  migrationsTransactionMode: 'each',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: process.env.TYPE_ORM_SYNC || dbConfig.synchronize,
  migrations: [__dirname + '/../database/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export = ormConfig;
