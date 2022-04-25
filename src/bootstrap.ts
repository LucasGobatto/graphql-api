import { createServer } from "http";
import express from "express";
import dotenv from "dotenv";

import { Database } from "./data/db/config/database.config";
import { ServerSetup } from "./api/graphql/config/setup";
import { configTestPaths } from "./test";

export async function bootstrap(test = false) {
  const path = test ? "./test.env" : "./.env";
  dotenv.config({ path });

  await Database.config({
    port: +process.env.DATABASE_PORT!,
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
  });
  console.log("DB configured!");

  const serverSetup = new ServerSetup();
  const server = await serverSetup.config();

  await server.start();

  const app = express();
  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = process.env.PORT ?? 4000;
  const httpServer = createServer(app);

  httpServer.listen(PORT);
  console.log(`Listen at http://localhost:${PORT}/graphql`);

  if (test) {
    await configTestPaths();
    run();
  }
}
