import { Service } from "typedi";
import { InputError } from "@core/error";
import { UsersInputModel, UsersTypeModel } from "./model/user.model";
import { UserDbDataSource } from "@data/source";

@Service()
export class GetManyUsersUseCase {
  constructor(private readonly userDbDataSource: UserDbDataSource) {}

  async exec(data: UsersInputModel): Promise<UsersTypeModel> {
    const take = data.limit ?? 10;
    const skip = data.offset ?? 0;

    if (take < 0 || skip < 0) {
      throw new InputError();
    }

    const [users, count] = await this.userDbDataSource.findAndCount({
      take,
      skip,
    });

    const hasNextPage = skip + take < count;
    const hasPreviousPage = skip > 0;

    users.forEach((user) => {
      delete user?.password;
    });

    return { users, count, hasNextPage, hasPreviousPage };
  }
}
