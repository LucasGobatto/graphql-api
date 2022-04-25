import { createServer } from "http";
import express from "express";
import dotenv from "dotenv";

import { Database } from "./data/db/config/database.config";
import { GraphQLServerSetup } from "./api/graphql/config/setup";
import { configTestPaths } from "./test";
import { RestServerSetup } from "@rest/config/setup";

export async function bootstrap(test = false) {
  const path = test ? "./test.env" : "./.env";
  dotenv.config({ path });

  const app = express();
  const PORT = process.env.PORT ?? 4000;

  await Database.config({
    port: +process.env.DATABASE_PORT!,
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
  });
  console.log("DB configured!");

  const graphQLServer = new GraphQLServerSetup();
  const server = await graphQLServer.config();
  await server.start();
  server.applyMiddleware({ app, path: "/graphql" });

  const restServer = new RestServerSetup();
  await restServer.config(app);

  const httpServer = createServer(app);

  httpServer.listen(PORT);
  console.log(`Listen at http://localhost:${PORT}/graphql`);

  if (test) {
    await configTestPaths();
    run();
  }
}
