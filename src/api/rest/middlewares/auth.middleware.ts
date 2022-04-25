import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response } from "express";
import { AuthError } from "@core/error";
import { JWTService } from "@core/security/jwt";

export class AuthMiddleware implements ExpressMiddlewareInterface {
  async use(
    request: Request,
    response: Response,
    next?: (error?: Error) => any
  ) {
    try {
      const token = request?.headers?.authorization;

      if (!token) {
        throw new AuthError();
      }

      JWTService.verify(token);

      next();
    } catch (e) {
      const error = e as any;
      console.log("[ERROR] -", error);

      response.statusCode = error.code ?? 401;
      next(error.base ? error : new AuthError());
    }
  }
}
