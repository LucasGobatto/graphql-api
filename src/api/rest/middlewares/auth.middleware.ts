import { ExpressMiddlewareInterface } from "routing-controllers";
import { Request, Response } from "express";
import { AuthError } from "@core/error";
import { JWTService } from "@core/security/jwt";
import { Service } from "typedi";
import { logger } from "@core/logger";

@Service()
export class AuthMiddleware implements ExpressMiddlewareInterface {
  constructor(private readonly jwtService: JWTService) {}

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

      this.jwtService.verify(token);

      next();
    } catch (e) {
      const error = e as any;
      logger.log(error);

      response.statusCode = error.code ?? 401;
      next(error.base ? error : new AuthError());
    }
  }
}
