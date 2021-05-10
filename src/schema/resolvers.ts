import { UserInput, UserType } from './schema.types';
import { User } from '../entity/User';
import { getRepository } from 'typeorm';
import { ValidateEmailUseCase, ValidatePasswordUseCase } from '../domain/validate-input.usa-case';

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

      if (ValidateEmailUseCase.exec(args.email)) {
        if (ValidatePasswordUseCase.exec(args.password)) {
          return await getRepository(User).save(user);
        } else {
          throw new Error('Senha inválida');
        }
      } else {
        throw new Error('Email inválido');
      }
    },
  },
};
