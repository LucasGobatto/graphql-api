import { getRepository } from 'typeorm';
import { Service } from 'typedi';
import { UserInput, UserType } from '../api/schema/schema.types';
import { InputError, NotFoundError } from '../chore/error';
import { UserDbDataSource } from '../data/source';

@Service()
export class GetOneUserUseCase {
  constructor(private readonly userDbDataSource: UserDbDataSource) {}

  async exec(data: UserInput): Promise<UserType> {
    const { id } = data;

    if (!id) {
      throw new InputError(undefined, 'Invalid id');
    }

    const user = await this.userDbDataSource.findById(id);

    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }
}
