import { Request, Response } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";
import { AuthError } from "@core/error";
import { JWTService } from "@core/security/jwt";

@Service()
export class AuthorizationMiddleware implements ExpressMiddlewareInterface {
  async use(request: Request, response: Response, next?: (e?: Error) => void) {
    const { headers } = request;

    const token = headers?.authorization;

    if (!token) {
      throw new AuthError(undefined, "Invalid token");
    }

    try {
      JWTService.verify(token);
      next();
    } catch (e) {
      response.statusCode = 401;
      const error = e as Error;

      console.log(`[ERROR] -`, error.message);
      next(new AuthError(error.name, error.message));
    }
  }
}
