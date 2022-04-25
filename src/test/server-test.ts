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

  async run(port = 8888) {
    this.app = express();

    this.server = this.app.listen(port);

    this.isStart = true;
  }

  stop() {
    if (!this.isStart) {
      throw new Error("ServerTest is not online yet");
    }

    this.isStart = false;
    this.server.close();
  }

  addRoute(options: RouteOptions) {
    const { method, path, handler } = options;

    this.app[method](path, handler);
  }
}
