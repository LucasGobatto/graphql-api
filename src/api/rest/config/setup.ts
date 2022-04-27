import * as path from "path";
import * as express from "express";
import { useExpressServer } from "routing-controllers";
import { logger } from "@core/logger";

export class RestServerSetup {
  async config(app: express.Express) {
    logger.log("Configuring Rest server");

    return useExpressServer(app, {
      controllers: [path.join(__dirname, "..", "**/*.controller.{ts,js}")],
      middlewares: [path.join(__dirname, "..", "**/*.middleware.{ts,js}")],
      defaultErrorHandler: false,
    });
  }
}
