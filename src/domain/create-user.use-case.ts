import { getRepository } from 'typeorm';

import { tryToAuthOrFail } from './validation/validate-token';
import { CryptoService } from '../chore/security/crypto';
import { User } from '../entity/User';
import { CreateUserInput, UserType, Context } from '../schema/schema.types';
import { validateEmail, validatePassword, validatePhone } from './validation';

export class CreateUserUseCase {
  static async exec(data: CreateUserInput, context: Context): Promise<UserType> {
    tryToAuthOrFail(context);
    const user = new User();
    user.email = data.email;
    user.password = data.password;
    user.name = data.name;
    user.phone = data.phone;

    const validEmail = validateEmail(data.email);

    if (!validEmail) {
      throw new Error('Invalid e-mail');
    }

    const validPassword = validatePassword(data.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    if (data.phone) {
      const validPhone = validatePhone(data.phone);
      if (!validPhone) {
        throw new Error('Invalid phone number');
      }
    }

    user.password = await CryptoService.hash(data.password);

    return await getRepository(User).save(user);
  }
}
