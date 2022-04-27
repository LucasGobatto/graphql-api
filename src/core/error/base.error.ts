export abstract class BaseError extends Error {
  public readonly base: boolean = true;
  public code: number;
  public details?: string;

  constructor(message: string, code: number, details?: string) {
    super(message);
    this.code = code ?? 500;
    this.details = details;
  }
}

export type GenericTypeError = typeof GenericError;

class GenericError extends BaseError {
  constructor(details?: string) {
    super("Generic Error", 500, details);
  }
}
