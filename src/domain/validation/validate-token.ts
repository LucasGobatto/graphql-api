import { AuthError } from '../../chore/error';
import { JWTService } from '../../chore/security/jwt';
import { Context } from '../../api/schema/schema.types';

export function tryToAuthOrFail(context: Context) {
  if (!context.token) {
    throw new AuthError(undefined, 'There is no token');
  }

  try {
    JWTService.verify(context.token);
  } catch (e) {
    const error = e as Error
    throw new AuthError(undefined, error.message);
  }
}
