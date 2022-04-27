import * as path from "path";
import * as express from "express";
import { useExpressServer } from "routing-controllers";

export class RestServerSetup {
  async config(app: express.Express) {
    console.log("Configuring Rest server");

    return useExpressServer(app, {
      controllers: [path.join(__dirname, "..", "**/*.controller.{ts,js}")],
      middlewares: [path.join(__dirname, "..", "**/*.middleware.{ts,js}")],
      defaultErrorHandler: false,
    });
  }
}
