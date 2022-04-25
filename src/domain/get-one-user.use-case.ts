import { Service } from "typedi";
import { UserInputModel, UserTypeModel } from "./model/user.model";
import { InputError, NotFoundError } from "../chore/error";
import { UserDbDataSource } from "../data/source";

@Service()
export class GetOneUserUseCase {
  constructor(private readonly userDbDataSource: UserDbDataSource) {}

  async exec(data: UserInputModel): Promise<UserTypeModel> {
    const { id } = data;

    if (!id) {
      throw new InputError(undefined, "Invalid id");
    }

    const user = await this.userDbDataSource.findById(id);

    if (!user) {
      throw new NotFoundError();
    }

    return user;
  }
}
