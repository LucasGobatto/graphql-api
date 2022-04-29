import { EnvConfig, LOG_LEVEL } from "@core/env/env.config";
import Container from "typedi";

enum LogLevel {
  Error = "error",
  Trace = "trace",
  Log = "log",
}

interface LoggerError {
  message: string;
  code: number;
  details: string;
}

export class Logger {
  private logLevel: LogLevel;
  private logHierachy: number;
  private initialized: boolean;

  configure() {
    if (!this.initialized) {
      this.logLevel = Container.get(LOG_LEVEL) as LogLevel;
      this.logHierachy = Object.values(LogLevel).indexOf(this.logLevel);
      this.initialized = true;
    } else {
      throw new Error("Logger have already initialized");
    }
  }

  log(data: any) {
    if (this.logHierachy >= 1) {
      console.log("[LOG] -", data);
    }
  }

  error(error: LoggerError): void;
  error(error: Error): void;
  error(error: Error | LoggerError) {
    if (this.logHierachy >= 0) {
      if (error instanceof Error) {
        const lopParams =
          this.logLevel === LogLevel.Trace
            ? { ...error }
            : {
                messsage: error.message,
                name: error.name,
              };

        console.error("[ERROR] -", lopParams);
      } else {
        console.error("[ERROR] -", error);
      }
    }
  }
}
