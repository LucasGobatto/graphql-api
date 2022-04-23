import { getRepository } from 'typeorm';

import { CryptoService } from '../chore/security/crypto';
import { UserEntity } from '../data/db/entity/user.entity';
import { CreateUserInput, UserType } from '../api/schema/schema.types';
import { validateEmail, validatePassword, validatePhone } from './validation';
import { InputError } from '../chore/error';
import { Service } from 'typedi';
import { UserDbDataSource } from '../data/source';

@Service()
export class CreateUserUseCase {
  constructor(private readonly userDbDataSource: UserDbDataSource) {}

  async exec(data: CreateUserInput): Promise<UserType> {
    const hasUser = await this.findUserInDatabase(data.email);

    if (hasUser) {
      throw new InputError(undefined, 'User already registred');
    }

    const user = new UserEntity();
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

    return await getRepository(UserEntity).save(user);
  }

  private findUserInDatabase(email: string): Promise<UserEntity | undefined> {
    return this.userDbDataSource.findOneByEmail(email);
  }
}
