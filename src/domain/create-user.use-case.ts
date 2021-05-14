import { getRepository } from 'typeorm';

import { tryToAuthOrFail } from './validation/validate-token';
import { CryptoService } from '../chore/security/crypto';
import { User } from '../entity/User';
import { CreateUserInput, UserType, Context } from '../schema/schema.types';
import { validateEmail, validatePassword, validatePhone } from './validation';
import { InputError } from '../chore/errror';

export class CreateUserUseCase {
  static async exec(data: CreateUserInput, context: Context): Promise<UserType> {
    tryToAuthOrFail(context);
    const hasUser = await new this().findUserInDatabase(data.email);

    if (hasUser) {
      throw new InputError(undefined, 'User already registred');
    }

    const user = new User();
    user.email = data.email;
    user.password = data.password;
    user.name = data.name;
    user.phone = data.phone;

    const validEmail = validateEmail(data.email);

    if (!validEmail) {
      throw new InputError(undefined, 'Invalid e-mail');
    }

    const validPassword = validatePassword(data.password);
    if (!validPassword) {
      throw new InputError(undefined, 'Invalid password');
    }

    if (data.phone) {
      const validPhone = validatePhone(data.phone);
      if (!validPhone) {
        throw new InputError(undefined, 'Invalid phone number');
      }
    }

    user.password = await CryptoService.hash(data.password);

    return await getRepository(User).save(user);
  }

  private async findUserInDatabase(email: string): Promise<boolean> {
    const user = await getRepository(User).findOne({ email });

    return !!user;
  }
}
