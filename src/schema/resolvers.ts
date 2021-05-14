import {
  LoginInput,
  LoginType,
  CreateUserInput,
  UserType,
  UserInput,
  Context,
  UsersInput,
  UsersType,
} from './schema.types';
import { CreateUserUseCase, GetOneUserUseCase, LoginUseCase, GetManyUsersUseCase } from '../domain';

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

    getManyUsers: async (_: any, { data }: { data: UsersInput }, ctx: Context): Promise<UsersType> => {
      return await GetManyUsersUseCase.exec(data, ctx);
    },
  },
};
