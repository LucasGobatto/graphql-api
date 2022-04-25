import {
  Controller,
  Post,
  Body,
  Get,
  UseBefore,
  OnUndefined,
  Param,
} from "routing-controllers";
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
  UsersInputModel,
  UsersTypeModel,
  UserTypeModel,
} from "@domain/model/user.model";
import { AuthorizationMiddleware } from "./authorization.decorator";
import { LogRequest } from "@core/decorator/log-request.decorator";
import { CheckBodyMiddleware } from "./check-body.middleware";

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
  @UseBefore(CheckBodyMiddleware)
  @LogRequest("UserController")
  @OnUndefined(401)
  login(@Body() data: LoginInputModel): Promise<LoginTypeModel> {
    return this.loginUseCase.exec(data);
  }

  @Post("/create-user")
  @UseBefore(CheckBodyMiddleware)
  @LogRequest("UserController")
  createUser(@Body() data: CreateUserInputModel): Promise<UserTypeModel> {
    return this.createUserUseCase.exec(data);
  }

  @Get("/get-one-user/:id")
  @UseBefore(AuthorizationMiddleware)
  @LogRequest("UserController")
  getOneUser(@Param("id") id: string): Promise<UserTypeModel> {
    return this.getOneUserUseCase.exec({ id });
  }

  @Get("/get-many-user")
  @UseBefore(AuthorizationMiddleware, CheckBodyMiddleware)
  @LogRequest("UserController")
  getManyUsers(@Body() data: UsersInputModel): Promise<UsersTypeModel> {
    return this.getManyUsersUseCase.exec(data);
  }
}
