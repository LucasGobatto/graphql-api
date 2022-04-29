import { ApolloServer } from "apollo-server-express";
import { formatError } from "@core/error";
import * as path from "path";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { AuthMiddleware } from "./validate-token";
import { logger } from "@core/logger";

export class GraphQLServerSetup {
  async config() {
    logger.log("Configuring GraphQL server");
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
