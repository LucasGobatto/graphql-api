import { LoginInput, LoginType, CreateUserInput, UserType } from './schema.types';
import { CreateUserUseCase } from '../domain/create-user.use-case';
import { LoginUseCase } from '../domain/login.use-case';

export const resolvers = {
  Mutation: {
    createUser: async (_: any, data: CreateUserInput): Promise<UserType> => {
      return await CreateUserUseCase.exec(data);
    },

    login: async (_: any, data: LoginInput): Promise<LoginType> => {
      return await LoginUseCase.exec(data);
    },
  },
};
