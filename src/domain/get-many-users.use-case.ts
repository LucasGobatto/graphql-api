import { Service } from 'typedi';
import { InputError } from '../chore/error';
import { UsersInput, UsersType } from '../api/schema/schema.types';
import { UserDbDataSource } from '../data/source';

@Service()
export class GetManyUsersUseCase {
  constructor(private readonly userDbDataSource: UserDbDataSource) {}

  async exec(data: UsersInput): Promise<UsersType> {

    const take = data.limit ?? 10;
    const skip = data.offset ?? 0;

    if (take < 0 || skip < 0) {
      throw new InputError();
    }

    const [users, count] = await this.userDbDataSource.findAndCount({ take, skip });

    const hasNextPage = skip + take < count;
    const hasPreviusPage = skip > 0;

    return { users, count, hasNextPage, hasPreviusPage };
  }
}
