import { InputError } from "@core/error";
import { Request, Response } from "express";
import { ExpressMiddlewareInterface } from "routing-controllers";
import { Service } from "typedi";

@Service()
export class CheckBodyMiddleware implements ExpressMiddlewareInterface {
  async use(request: Request, response: Response, next?: (err?: Error) => any) {
    const body = request.body;

    if (!body) {
      const error = new InputError(
        undefined,
        `Invalid body object. Got ${JSON.stringify(body)}`
      );

      response.statusCode = 400;
      next(error);
    } else {
      next();
      return;
    }
  }
}
