import { LoginInput, LoginType, CreateUserInput, UserType, UserInput, Context } from './schema.types';
import { CreateUserUseCase, GetOneUserUseCase, LoginUseCase } from '../domain';

export const resolvers = {
  Mutation: {
    createUser: async (_: any, { data }: { data: CreateUserInput }, ctx: Context): Promise<UserType> => {
      return await CreateUserUseCase.exec(data, ctx);
    },

    login: async (_: any, { data }: { data: LoginInput }): Promise<LoginType> => {
      return await LoginUseCase.exec(data);
    },
  },

  Query: {
    getOneUser: async (_: any, { data }: { data: UserInput }, ctx: Context): Promise<UserType> => {
      return await GetOneUserUseCase.exec(data, ctx);
    },
  },
};
