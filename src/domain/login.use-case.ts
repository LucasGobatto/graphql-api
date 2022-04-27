import { Service } from "typedi";
import { CryptoService } from "@core/security/crypto";
import { JWTService } from "@core/security/jwt";
import {
  LoginInputModel,
  LoginTypeModel,
  UserTypeModel,
} from "./model/user.model";
import { AuthError } from "@core/error";
import { UserDbDataSource } from "@data/source";

@Service()
export class LoginUseCase {
  constructor(
    private readonly userDbDataSource: UserDbDataSource,
    private readonly jwtService: JWTService
  ) {}

  async exec(data: LoginInputModel): Promise<LoginTypeModel> {
    const { password, email } = data;

    const user = await this.validateLogin({ password, email });

    const { id, name } = user;
    const token = this.jwtService.sign({ name, id });

    return {
      token,
      user,
    };
  }

  private async validateLogin({
    password,
    email,
  }: {
    password: string;
    email: string;
  }): Promise<UserTypeModel> {
    const user = await this.userDbDataSource.findOneByEmail(email);

    if (!user) {
      throw new AuthError();
    }

    const isValid = await CryptoService.verify(password, user.password);

    if (!isValid) {
      throw new AuthError();
    }

    delete user.password;
    return user;
  }
}
