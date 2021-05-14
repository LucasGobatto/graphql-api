import * as jwt from 'jsonwebtoken';

interface TokenData {
  id: number;
  name: string;
}

export class JWTService {
  static sign(data: TokenData): string {
    return jwt.sign({ data }, process.env.SECRET!, { expiresIn: process.env.EXPIRATION });
  }

  static verify(token: string) {
    return jwt.verify(token, process.env.SECRET!);
  }
}
