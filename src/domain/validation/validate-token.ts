import { AuthError } from '../../chore/errror';
import { JWTService } from '../../chore/security/jwt';
import { Context } from '../../schema/schema.types';

export function tryToAuthOrFail(context: Context) {
  if (!context.token) {
    throw new AuthError('Invalid credentials', 'There is no token');
  }

  try {
    JWTService.verify(context.token);
  } catch ({ message }) {
    throw new AuthError('Invalid credentials', message);
  }
}
