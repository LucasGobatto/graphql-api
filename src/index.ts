import 'reflect-metadata';
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import express from "express";
import dotenv from 'dotenv';

import { resolvers, typeDefs } from "./schema";

const path = process.env.TEST === 'OK' ? '.env' : '.test.env'
dotenv.config({ path });

console.log(process.env)
const server = new ApolloServer({ resolvers, typeDefs });

const app = express();

server.applyMiddleware({ app, path: "/graphql" });

const PORT = process.env.PORT ?? 4000;
const httpServer = createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Listen at http://localhost:${PORT}/graphql`);
});
