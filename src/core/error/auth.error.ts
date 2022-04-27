import { BaseError } from "./base.error";

export class AuthError extends BaseError {
  constructor(details?: string) {
    super("Unauthorized. Invalid credentials", 401, details);
  }
}
