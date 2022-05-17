import {
  Post,
  Body,
  Get,
  UseBefore,
  JsonController,
  UseAfter,
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
  UserInputModel,
  UsersInputModel,
  UsersTypeModel,
  UserTypeModel,
} from "@domain/model";
import { RequestLogger } from "@core/decorators";
import { AuthMiddleware, FormatErrorMiddleware } from "@rest/middlewares";

@Service()
@JsonController()
@UseAfter(FormatErrorMiddleware)
export class UserController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getOneUserUseCase: GetOneUserUseCase,
    private readonly getManyUsersUseCase: GetManyUsersUseCase
  ) {}

  @Post("/login")
  @RequestLogger("UserController")
  login(@Body() data: LoginInputModel): Promise<LoginTypeModel> {
    return this.loginUseCase.exec(data);
  }

  @Post("/create-user")
  @RequestLogger("UserController")
  createUser(@Body() data: CreateUserInputModel): Promise<UserTypeModel> {
    return this.createUserUseCase.exec(data);
  }

  @Get("/get-one-user")
  @UseBefore(AuthMiddleware)
  @RequestLogger("UserController")
  getOneUser(@Body() data: UserInputModel): Promise<UserTypeModel> {
    return this.getOneUserUseCase.exec(data);
  }

  @Get("/get-many-users")
  @UseBefore(AuthMiddleware)
  @RequestLogger("UserController")
  getManyUsers(@Body() data: UsersInputModel): Promise<UsersTypeModel> {
    return this.getManyUsersUseCase.exec(data);
  }
}
