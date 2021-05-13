import { JWTService } from '../chore/security/jwt';
import { LoginInput, LoginType } from '../schema/schema.types';
import { validateLogin } from './validation';

export class LoginUseCase {
  static async exec(data: LoginInput): Promise<LoginType> {
    const { password, email } = data;

    const user = await validateLogin({ password, email });

    const { id, name } = user;
    const token = JWTService.sign({ name, id });

    return {
      token,
      user,
    };
  }
}
