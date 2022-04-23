import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import express from 'express';
import dotenv from 'dotenv';

import { Database } from './data/db/config/database.config';
import { resolvers, typeDefs } from './api/schema';
import { formatError } from './chore/error';

export async function bootstrap() {

  const path = process.env.TEST === 'OK' ? './.test.env' : './.env';
  dotenv.config({ path });

  await Database.config({
    port: +process.env.DATABASE_PORT!,
    username: process.env.DATABASE_USERNAME!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
  });
  console.log('DB configured!');

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    formatError,
    context: ({ req }) => ({ token: req.headers.authorization }),
  });

  const app = express();

  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = process.env.PORT ?? 4000;
  const httpServer = createServer(app);

  httpServer.listen(PORT)
  console.log(`Listen at http://localhost:${PORT}/graphql`);
}
