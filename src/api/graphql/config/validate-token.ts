import { AuthChecker } from "type-graphql";
import { AuthError } from "@core/error";
import { JWTService } from "@core/security/jwt";
import { ServerContext } from "@domain/model/user.model";

export const AuthMiddleware: AuthChecker<ServerContext> = ({ context }) => {
  if (!context.token) {
    throw new AuthError(undefined, "There is no token");
  }

  try {
    JWTService.verify(context.token);

    return true;
  } catch (e) {
    const error = e as Error;
    throw new AuthError(undefined, error.message);
  }
};
