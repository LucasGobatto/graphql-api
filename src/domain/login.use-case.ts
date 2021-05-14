import { getRepository } from 'typeorm';

import { CryptoService } from '../chore/security/crypto';
import { User } from '../entity/User';
import { JWTService } from '../chore/security/jwt';
import { LoginInput, LoginType, UserType } from '../schema/schema.types';
import { AuthError, NotFoundError } from '../chore/errror';

export class LoginUseCase {
  static async exec(data: LoginInput): Promise<LoginType> {
    const { password, email } = data;

    const user = await new this().validateLogin({ password, email });

    const { id, name } = user;
    const token = JWTService.sign({ name, id });

    return {
      token,
      user,
    };
  }

  private async validateLogin({ password, email }: { password: string; email: string }): Promise<UserType> {
    const user = await getRepository(User).findOne({ email });

    if (!user) {
      throw new NotFoundError(undefined, 'User not found.');
    }

    const isValid = await CryptoService.verify(password, user.password);

    if (!isValid) {
      throw new AuthError('Invalid password');
    }

    return user;
  }
}
