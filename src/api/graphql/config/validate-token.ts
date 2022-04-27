import { AuthChecker } from "type-graphql";
import { AuthError } from "@core/error";
import { JWTService } from "@core/security/jwt";
import { ServerContext } from "@domain/model/user.model";
import Container from "typedi";

export const AuthMiddleware: AuthChecker<ServerContext> = ({ context }) => {
  const jwtService = Container.get(JWTService);

  if (!context.token) {
    throw new AuthError("There is no token");
  }

  try {
    jwtService.verify(context.token);

    return true;
  } catch (e) {
    const error = e as Error;
    throw new AuthError(error.message);
  }
};
