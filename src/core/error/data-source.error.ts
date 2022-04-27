import { BaseError } from "./base.error";

export class DataSourceError extends BaseError {
  constructor(details?: string) {
    super("Internal Error", 500, details);
  }
}
