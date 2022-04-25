import { Request, Response } from "express";
import { ExpressErrorMiddlewareInterface } from "routing-controllers";

export class FormatErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(
    error: any,
    _request: Request,
    response: Response,
    next?: (error?: Error) => void
  ) {
    const isBase = error.base;

    if (!isBase) {
      response.statusCode = 500;
      response.json({
        error: {
          error: "Internal Error",
          details: error.message,
        },
      });
    }

    response.statusCode = error.code;
    response.json({
      error: {
        details: error.details,
        message: error.message,
      },
    });
    next();
  }
}
