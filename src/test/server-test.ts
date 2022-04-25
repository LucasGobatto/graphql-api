import express, { Express, Request, Response } from "express";
import { Server } from "http";

interface RouteOptions {
  method: "get" | "post" | "patch" | "delete";
  path: string;
  handler: (req: Request, res: Response) => Promise<any>;
}

export class ServerTest {
  private isStart = false;
  private app: Express;
  private server: Server;

  constructor() {
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  async run(port = 8888) {
    this.server = this.app.listen(port);

    this.isStart = true;
  }

  async stop() {
    if (!this.isStart) {
      throw new Error("ServerTest is not online yet");
    }

    this.isStart = false;
    this.server.close();
  }

  async addRoute(options: RouteOptions) {
    const { method, path, handler } = options;

    this.app[method](path, handler);
  }
}
