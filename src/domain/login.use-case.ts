import { Service } from 'typedi';
import { CryptoService } from '../chore/security/crypto';
import { JWTService } from '../chore/security/jwt';
import { LoginInput, LoginType, UserType } from '../api/schema/schema.types';
import { AuthError, NotFoundError } from '../chore/error';
import { UserDbDataSource } from '../data/source';

@Service()
export class LoginUseCase {
  constructor(private readonly userDbDataSource: UserDbDataSource) {}

  async exec(data: LoginInput): Promise<LoginType> {
    const { password, email } = data;

    const user = await this.validateLogin({ password, email });

    const { id, name } = user;
    const token = JWTService.sign({ name, id });

    return {
      token,
      user,
    };
  }

  private async validateLogin({ password, email }: { password: string; email: string }): Promise<UserType> {
    const user = await this.userDbDataSource.findOneByEmail(email);

    if (!user) {
      throw new NotFoundError(undefined, 'User not found.');
    }

    const isValid = await CryptoService.verify(password, user.password);

    if (!isValid) {
      throw new AuthError('Invalid password');
    }

    return user;
  }
}
