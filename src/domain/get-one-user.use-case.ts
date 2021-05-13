import { getRepository } from 'typeorm';

import { tryToAuthOrFail } from '../chore/security/jwt';
import { User } from '../entity/User';
import { UserInput, UserType, Context } from '../schema/schema.types';

export class GetOneUserUseCase {
  static async exec(data: UserInput, context: Context): Promise<UserType> {
    tryToAuthOrFail(context);
    const { id } = data;

    if (id <= 0) {
      throw new Error('Invalid id');
    }

    const user = await getRepository(User).findOne({ id });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
