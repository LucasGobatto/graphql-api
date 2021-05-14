import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import { Context, UsersInput, UsersType } from '../schema/schema.types';
import { tryToAuthOrFail } from './validation/validate-token';

export class GetManyUsersUseCase {
  static async exec(data: UsersInput, context: Context): Promise<UsersType> {
    tryToAuthOrFail(context);

    const take = data.limit ?? 10;
    const skip = data.offset ?? 0;

    if (take < 0 || skip < 0) {
      throw new Error('Invalid input');
    }

    const [users, count] = await getRepository(User).findAndCount({ order: { id: 'ASC' }, take, skip });

    const hasNextPage = skip + take < count;
    const hasPreviusPage = skip > 0;

    return { users, count, hasNextPage, hasPreviusPage };
  }
}
