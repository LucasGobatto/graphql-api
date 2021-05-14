import { getRepository } from 'typeorm';

import { tryToAuthOrFail } from './validation/validate-token';
import { User } from '../entity/User';
import { UserInput, UserType, Context } from '../schema/schema.types';
import { InputError, NotFoundError } from '../chore/errror';

export class GetOneUserUseCase {
  static async exec(data: UserInput, context: Context): Promise<UserType> {
    tryToAuthOrFail(context);
    const { id } = data;

    if (id <= 0) {
      throw new InputError(undefined, 'Invalid id');
    }

    const user = await getRepository(User).findOne({ id });

    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }
}
