import * as jwt from "jsonwebtoken";
import { Inject, Service } from "typedi";
import { EXPIRATION, SECRET } from "@core/env/env.config";

interface TokenData {
  id: string;
  name: string;
}

@Service()
export class JWTService {
  constructor(
    @Inject(SECRET) private readonly secret: string,
    @Inject(EXPIRATION) private readonly expiresIn: string
  ) {}

  sign(data: TokenData): string {
    return jwt.sign({ data }, this.secret, { expiresIn: this.expiresIn });
  }

  verify(token: string) {
    return jwt.verify(token, this.secret);
  }
}
