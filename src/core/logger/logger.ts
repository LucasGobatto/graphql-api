import { Service } from "typedi";

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

@Service()
export class Logger {
  private readonly logLevel: LogLevel;
  private readonly logHierachy: number;

  constructor() {
    this.logLevel = (process.env.LOG_LEVEL ?? null) as LogLevel;
    this.logHierachy = Object.values(LogLevel).indexOf(this.logLevel);
  }

  log(data?: any) {
    if (this.logHierachy >= 1) {
      if (data) {
        console.log(`[LOG] - ${data}`);
      } else {
        console.log();
      }
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
