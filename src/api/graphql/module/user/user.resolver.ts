import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import {
  CreateUserUseCase,
  GetOneUserUseCase,
  LoginUseCase,
  GetManyUsersUseCase,
} from "@domain";
import { CreateUserInput, LoginInput, UserInput, UsersInput } from "./input";
import { ServerContext } from "@domain/model/user.model";
import { UsersType, UserType, LoginType } from "./type";
import { RequestLogger } from "@core/decorators";

@Service()
@Resolver()
export class UserResolver {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly getManyUsersUseCase: GetManyUsersUseCase
  ) {}

  @Query(() => UserType, { description: "fetch an especific user" })
  @Authorized()
  @RequestLogger("UserResolver")
  getOneUser(
    @Ctx() _ctx: ServerContext,
    @Arg("data") data: UserInput
  ): Promise<UserType> {
    console.info("getOneUser called with data", JSON.stringify(data));
    return this.getOneUserUseCase.exec(data);
  }

  @Query(() => UsersType, { description: "fetch many users" })
  @Authorized()
  @RequestLogger("UserResolver")
  getManyUsers(
    @Ctx() _ctx: ServerContext,
    @Arg("data") data: UsersInput
  ): Promise<UsersType> {
    console.info("getManyUsers called with data", JSON.stringify(data));
    return this.getManyUsersUseCase.exec(data);
  }

  @Mutation(() => UserType, { description: "create a new user" })
  @RequestLogger("UserResolver")
  createUser(@Arg("data") data: CreateUserInput): Promise<UserType> {
    console.info("createUser called with data", JSON.stringify(data));
    return this.createUserUseCase.exec(data);
  }

  @Mutation(() => LoginType, { description: "make login" })
  @RequestLogger("UserResolver")
  login(@Arg("data") data: LoginInput): Promise<LoginType> {
    console.info("login called with data", JSON.stringify(data));
    return this.loginUseCase.exec(data);
  }
}
