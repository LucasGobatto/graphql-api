import { getRepository } from 'typeorm';
import { LoginInput, LoginType, UserInput, UserType } from './schema.types';
import { User } from '../entity/User';
import { ValidateLoginUseCase, ValidateEmailUseCase, ValidatePasswordUseCase } from '../domain';
import { CryptoService } from '../chore/security/crypto';

export const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },

  Mutation: {
    createUser: async (_: any, { data: args }: { data: UserInput }): Promise<UserType> => {
      const user = new User();
      user.email = args.email;
      user.password = args.password;
      user.name = args.name;
      user.birthDate = args.birthDate;
      user.phone = args.phone;
      user.avatar = args.avatar;

      const validEmail = ValidateEmailUseCase.exec(args.email);

      if (!validEmail) {
        throw new Error('Email inválido');
      }

      const validPassword = ValidatePasswordUseCase.exec(args.password);
      if (!validPassword) {
        throw new Error('Senha inválida');
      }

      user.password = await CryptoService.hash(args.password);

      return await getRepository(User).save(user);
    },

    login: async (_: any, { data: args }: { data: LoginInput }): Promise<LoginType> => {
      const { password, email } = args;

      const user = await ValidateLoginUseCase.exec({ password, email });
      const token = 'mocked_token';

      return {
        token,
        user,
      };
    },
  },
};
