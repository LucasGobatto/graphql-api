import { createServer } from "http";
import express from "express";

import { Database } from "./data/db/config/database.config";
import { GraphQLServerSetup } from "./api/graphql/config/setup";
import { configTestPaths } from "./test";
import { RestServerSetup } from "@rest/config/setup";
import {
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
  EnvConfig,
  PORT,
} from "@core/env/env.config";
import { Container } from "typedi";
import { logger } from "@core/logger";

export async function bootstrap(test = false) {
  try {
    const envConfig = new EnvConfig();
    envConfig.configure(test);
    logger.configure();

    const port = Container.get(PORT) ?? 4000;
    const datatbasePort = Container.get(DATABASE_PORT);
    const username = Container.get(DATABASE_USERNAME);
    const password = Container.get(DATABASE_PASSWORD);
    const database = Container.get(DATABASE_NAME);

    const app = express();

    await Database.config({
      port: datatbasePort,
      username,
      password,
      database,
    });

    const graphQLServer = new GraphQLServerSetup();
    const server = await graphQLServer.config();
    await server.start();
    server.applyMiddleware({ app, path: "/graphql" });

    const restServer = new RestServerSetup();
    await restServer.config(app);

    const httpServer = createServer(app);

    httpServer.listen(port);
    console.log(`Listen at http://localhost:${port}/graphql`);

    if (test) {
      await configTestPaths();
      run();
    }

    console.log();
  } catch (error) {
    console.error("Fatal", error);
    throw error;
  }
}
