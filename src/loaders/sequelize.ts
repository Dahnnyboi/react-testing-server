import { Sequelize } from 'sequelize';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  IS_DEVELOPMENT,
} from '@configs/environment';

const SSLOptions: boolean | SSLOPTIONTYPE = IS_DEVELOPMENT
  ? false
  : {
      require: true,
      rejectUnauthorized: false,
    };

const sequelize = new Sequelize(
  DATABASE_NAME || 'testing',
  DATABASE_USER || 'postgres',
  DATABASE_PASSWORD || 'password',
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: SSLOptions,
    },
    port: 5432,
    host: DATABASE_HOST || 'localhost',
    query: { raw: true },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

export default sequelize;
