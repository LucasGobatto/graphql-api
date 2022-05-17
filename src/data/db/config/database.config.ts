import { logger } from "@core/logger";
import * as path from "path";
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
      entities: [path.join(__dirname, "..", "entity", "*.ts")],
      migrations: [path.join(__dirname, "..", "migrate", "*", "**.migrate.ts")],
      cli: {
        migrationsDir: path.join(__dirname, "..", "migrate"),
      },
      synchronize: false,
    });
  }
}
