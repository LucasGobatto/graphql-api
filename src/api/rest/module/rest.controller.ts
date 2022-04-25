import { Controller, Post, Body, Get } from "routing-controllers";
import { Service } from "typedi";
import {
  LoginUseCase,
  CreateUserUseCase,
  GetOneUserUseCase,
  GetManyUsersUseCase,
} from "@domain";
import {
  CreateUserInputModel,
  LoginInputModel,
  LoginTypeModel,
  UserInputModel,
  UsersInputModel,
  UsersTypeModel,
  UserTypeModel,
} from "@domain/model/user.model";

@Controller()
@Service()
export class UserController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly getManyUsersUseCase: GetManyUsersUseCase
  ) {}

  @Post("/login")
  login(@Body() data: LoginInputModel): Promise<LoginTypeModel> {
    return this.loginUseCase.exec(data);
  }

  @Post("/create-user")
  createUser(@Body() data: CreateUserInputModel): Promise<UserTypeModel> {
    return this.createUserUseCase.exec(data);
  }

  @Get("/get-one-user")
  getOneUser(@Body() data: UserInputModel): Promise<UserTypeModel> {
    return this.getOneUserUseCase.exec(data);
  }

  @Get("/get-many-user")
  getManyUsers(@Body() data: UsersInputModel): Promise<UsersTypeModel> {
    return this.getManyUsersUseCase.exec(data);
  }
}
