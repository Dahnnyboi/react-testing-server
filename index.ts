import 'reflect-metadata';

import express from 'express';
import { ENVIRONMENT } from '@configs/constants';
import { PORT } from '@configs/environment';
import Loaders from '@loaders';
import Logger from '@utils/logger';

async function startServer() {
  const app = express();

  await Loaders(app);

  app.listen(PORT, () => {
    Logger.info(`Environment running at ${ENVIRONMENT}`);
    Logger.info(`Running at ${PORT}`);
  });
}

startServer();
