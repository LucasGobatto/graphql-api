import Container from 'typedi';
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
import { CreateUserUseCase, GetOneUserUseCase, LoginUseCase, GetManyUsersUseCase } from '../../domain';
import { tryToAuthOrFail } from '../../domain/validation/validate-token';

export const resolvers = {
  Mutation: {
    createUser: (_: any, { data }: { data: CreateUserInput }): Promise<UserType> => {
      console.info("createUser called with data", JSON.stringify(data))
      return Container.get(CreateUserUseCase).exec(data);
    },

    login: (_: any, { data }: { data: LoginInput }): Promise<LoginType> => {
      console.info("login called with data", JSON.stringify(data))
      return Container.get(LoginUseCase).exec(data);
    },
  },

  Query: {
    getOneUser: (_: any, { data }: { data: UserInput }, ctx: Context): Promise<UserType> => {
      tryToAuthOrFail(ctx);
      console.info("getOneUser called with data", JSON.stringify(data))
      return Container.get(GetOneUserUseCase).exec(data);
    },

    getManyUsers: (_: any, { data }: { data: UsersInput }, ctx: Context): Promise<UsersType> => {
      tryToAuthOrFail(ctx);
      console.info("getManyUsers called with data", JSON.stringify(data))
      return Container.get(GetManyUsersUseCase).exec(data);
    },
  },
};
