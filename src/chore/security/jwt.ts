import * as jwt from 'jsonwebtoken';
import { Context } from '../../schema/schema.types';

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

export function tryToAuthOrFail(context: Context) {
  if (!context.token) {
    throw new Error('Invalid Credentials');
  }

  try {
    JWTService.verify(context.token);
  } catch ({ message }) {
    throw new Error(message);
  }
}
