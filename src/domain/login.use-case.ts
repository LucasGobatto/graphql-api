import { getRepository } from 'typeorm';

import { CryptoService } from '../chore/security/crypto';
import { User } from '../entity/User';
import { JWTService } from '../chore/security/jwt';
import { LoginInput, LoginType } from '../schema/schema.types';

export class LoginUseCase {
  static async exec(data: LoginInput): Promise<LoginType> {
    const { password, email } = data;

    const user = await getRepository(User).findOne({ email });

    if (!user) {
      throw new Error('User not found.');
    }

    const isValid = await CryptoService.verify(password, user.password);

    if (!isValid) {
      throw new Error('Unauthorized. Invalid password');
    }

    const { id, name } = user;
    const token = JWTService.sign({ name, id });

    return {
      token,
      user,
    };
  }
}
