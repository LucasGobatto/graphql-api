import { Service } from "typedi";
import { CryptoService } from "@core/security/crypto";
import { JWTService } from "@core/security/jwt";
import { LoginInputModel, LoginTypeModel, UserTypeModel } from "@domain/model";
import { AuthError } from "@core/error";
import { UserDbDataSource } from "@data/source";

@Service()
export class LoginUseCase {
  constructor(
    private readonly userDbDataSource: UserDbDataSource,
    private readonly jwtService: JWTService,
    private readonly cryptoService: CryptoService
  ) {}

  async exec(data: LoginInputModel): Promise<LoginTypeModel> {
    const user = await this.validateLogin(data);

    const { id, name } = user;
    const token = this.jwtService.sign({ name, id });

    return {
      token,
      user,
    };
  }

  private async validateLogin(input: LoginInputModel): Promise<UserTypeModel> {
    const { password, email } = input;

    const user = await this.userDbDataSource.findOneByEmail(email);

    if (!user) {
      throw new AuthError();
    }

    const isValid = await this.cryptoService.verify(password, user.password);

    if (!isValid) {
      throw new AuthError();
    }

    delete user.password;
    return user;
  }
}
