import { EnvConfig } from "@core/env/env.config";

enum LogLevel {
  Error = "error",
  Trace = "trace",
  Log = "log",
}

interface LoggerError {
  message: string;
  code: number;
  details: string;
  error: Error;
}

export class Logger {
  private readonly logLevel: LogLevel;
  private readonly logHierachy: number;

  constructor() {
    this.logLevel = EnvConfig.get("LOG_LEVEL") as LogLevel;
    console.log(this.logLevel);
    this.logHierachy = Object.values(LogLevel).indexOf(this.logLevel);
  }

  log(data: any) {
    if (this.logHierachy >= 1) {
      console.log(`[LOG] - ${data}`);
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
        console.error(`[ERROR] - ${error}`);
      }
    }
  }
}
