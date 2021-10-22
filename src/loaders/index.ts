import { Application } from 'express';
import Logger from '@utils/logger';
import expressLoader from './express';
import sequelizeLoader from './sequelize';

export default async (app: Application): Promise<void> => {
  await expressLoader(app);
  Logger.info('Express is Loaded');

  try {
    await sequelizeLoader.sync();
    await sequelizeLoader.authenticate();
    Logger.info(
      'Connection to database has been established successfully.',
    );
  } catch (e) {
    Logger.error(e);
  }
};
