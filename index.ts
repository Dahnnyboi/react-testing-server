import "reflect-metadata";

import express from "express";
import { PORT, ENVIRONMENT } from "@configs/constants";
import Loaders from "@loaders";
import Logger from "@utils/logger";

async function startServer() {
  const app = express();

  await Loaders(app);

  app.listen(PORT, () => {
    Logger.info(`Environment running at ${ENVIRONMENT}`);
    Logger.info(`Running at ${PORT}`);
  });
}

startServer();
