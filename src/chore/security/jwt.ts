import * as jwt from 'jsonwebtoken';

interface TokenData {
  id: number;
  name: string;
}

function sign(data: TokenData): string {
  return jwt.sign({ data }, process.env.SECRET!, { expiresIn: process.env.EXPIRATION });
}

function verify(token: string) {
  return jwt.verify(token, process.env.SECRET!);
}

export const JWTService = {
  sign,
  verify,
};
