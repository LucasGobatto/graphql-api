import { CryptoService } from "@core/security/crypto";
import { UserEntity } from "@entity";
import { CreateUserInputModel, UserTypeModel } from "./model";
import { validateEmail, validatePassword, validatePhone } from "./validation";
import { InputError } from "@core/error";
import { Service } from "typedi";
import { UserDbDataSource } from "@data/source";

@Service()
export class CreateUserUseCase {
  constructor(
    private readonly userDbDataSource: UserDbDataSource,
    private readonly cryptoService: CryptoService
  ) {}

  async exec(data: CreateUserInputModel): Promise<UserTypeModel> {
    const hasUser = await this.userDbDataSource.findOneByEmail(data.email);

    if (hasUser) {
      throw new InputError("Invalid e-mail");
    }

    const user = new UserEntity();
    user.email = data.email;
    user.password = data.password;
    user.name = data.name;
    user.phone = data.phone;

    const validEmail = validateEmail(data.email);

    if (!validEmail) {
      throw new InputError("Invalid e-mail");
    }

    const validPassword = validatePassword(data.password);

    if (!validPassword) {
      throw new InputError("Invalid password");
    }

    if (data.phone) {
      const validPhone = validatePhone(data.phone);

      if (!validPhone) {
        throw new InputError("Invalid phone number");
      }
    }

    user.password = await this.cryptoService.hash(data.password);

    return this.userDbDataSource.save(user);
  }
}
