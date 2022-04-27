import { Container, Token } from "typedi";
import dotenv from "dotenv";

export const PORT = new Token<number>("PORT");
export const DATABASE_PORT = new Token<number>("DATABASE_PORT");
export const DATABASE_USERNAME = new Token<string>("DATABASE_USERNAME");
export const DATABASE_PASSWORD = new Token<string>("DATABASE_PASSWORD");
export const DATABASE_NAME = new Token<string>("DATABASE_NAME");
export const SECRET = new Token<string>("SECRET");
export const EXPIRATION = new Token<string>("EXPIRATION");

export class EnvConfig {
  configure(test: boolean) {
    console.log("Configuring env");

    const path = test ? "./test.env" : "./.env";
    dotenv.config({ path });

    Container.set(PORT, process.env.PORT);
    Container.set(DATABASE_PORT, process.env.DATABASE_PORT);
    Container.set(DATABASE_USERNAME, process.env.DATABASE_USERNAME);
    Container.set(DATABASE_PASSWORD, process.env.DATABASE_PASSWORD);
    Container.set(DATABASE_NAME, process.env.DATABASE_NAME);
    Container.set(SECRET, process.env.SECRET);
    Container.set(EXPIRATION, process.env.EXPIRATION);
  }
}
