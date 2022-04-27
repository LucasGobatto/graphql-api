import { logger } from "@core/logger";
import { Connection, createConnection } from "typeorm";

interface DatabaseParams {
  username: string;
  password: string;
  database: string;
  port: number;
}

export class Database {
  static async config(param: DatabaseParams): Promise<Connection> {
    logger.log("Configuring DB");

    return createConnection({
      type: "postgres",
      host: "localhost",
      port: param.port,
      username: param.username,
      password: param.password,
      database: param.database,
      entities: [__dirname + "/../entity/*.ts"],
      synchronize: true,
    });
  }
}
