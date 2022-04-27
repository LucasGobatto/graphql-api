import { GraphQLError } from "graphql";
import { BaseError } from "./base.error";

enum InputValidationErrorTypes {
  BadUserInput = "BAD_USER_INPUT",
  InternalServerError = "INTERNAL_SERVER_ERROR",
}

export const formatError = (error: GraphQLError) => {
  const originalError = error.originalError as BaseError;

  if (!originalError?.base) {
    if (verifyError(error.extensions.code)) {
      return {
        message: "Invalid input",
        code: 401,
        details: error.message,
      };
    }

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

function verifyError(code: string) {
  const values = Object.values(InputValidationErrorTypes) as string[];

  return values.includes(code);
}
