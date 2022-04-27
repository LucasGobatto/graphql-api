import { BaseError } from "./base.error";

export class InputError extends BaseError {
  constructor(details?: string) {
    super("Invalid Input", 400, details);
  }
}
