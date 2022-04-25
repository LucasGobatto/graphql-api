import { GraphQLError } from "graphql";

abstract class BaseError extends Error {
  public readonly base: boolean = true;
  public code: number;
  public details?: string;

  constructor(message: string, code: number, details?: string) {
    super(message);
    this.code = code ?? 500;
    this.details = details;
  }
}

export class AuthError extends BaseError {
  constructor(message?: string, details?: string) {
    super(message ?? "Invalid credentials", 401, details ?? "Unauthorized");
  }
}

export class NotFoundError extends BaseError {
  constructor(message?: string, details?: string) {
    super(message ?? "User not found", 404, details ?? "User not found");
  }
}

export class InputError extends BaseError {
  constructor(messege?: string, details?: string) {
    super(messege ?? "Invalid Input", 400, details);
  }
}

export const formatError = (error: GraphQLError) => {
  const originalError = error.originalError as BaseError;

  if (!originalError?.base) {
    return {
      message: "Unexpected Error. Something is wrong",
      code: 500,
      details: error.message,
    };
  }
  return {
    message: originalError.message,
    code: originalError.code,
    details: originalError.details,
  };
};
