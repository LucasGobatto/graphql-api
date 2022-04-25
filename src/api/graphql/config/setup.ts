import { ApolloServer } from "apollo-server-express";
import { formatError } from "graphql";
import path from "path";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { AuthMiddleware } from "./validate-token";

export class ServerSetup {
  async config() {
    const schema = await this.getSchema();

    return new ApolloServer({
      schema,
      formatError,
      context: ({ req }) => ({ token: req.headers.authorization }),
    });
  }

  private getSchema() {
    return buildSchema({
      resolvers: [
        path.join(__dirname, "..", "module", "**", "*.resolver.{js,ts}"),
      ],
      container: Container,
      authChecker: AuthMiddleware,
    });
  }
}
