import { JWTService } from '../../chore/security/jwt';
import { Context } from '../../schema/schema.types';

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
