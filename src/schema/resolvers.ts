import { getRepository } from 'typeorm';

import { LoginInput, LoginType, CreateUserInput, UserType } from './schema.types';
import { User } from '../entity/User';
import { ValidateLoginUseCase, ValidateEmailUseCase, ValidatePasswordUseCase } from '../domain';
import { CryptoService } from '../chore/security/crypto';
import { JWTService } from '../chore/security/jwt';

export const resolvers = {
  Mutation: {
    createUser: async (_: any, { data: args }: { data: CreateUserInput }): Promise<UserType> => {
      const user = new User();
      user.email = args.email;
      user.password = args.password;
      user.name = args.name;
      user.phone = args.phone;

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

      const { id, name } = user;
      const token = JWTService.sign({ name, id });

      return {
        token,
        user,
      };
    },
  },
};
