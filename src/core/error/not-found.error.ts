import { BaseError } from "./base.error";

export class NotFoundError extends BaseError {
  constructor(details?: string) {
    super("Not found", 404, details);
  }
}
