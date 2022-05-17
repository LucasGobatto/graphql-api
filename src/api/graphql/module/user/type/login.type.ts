import { Field, ObjectType } from "type-graphql";
import { LoginTypeModel } from "@domain/model";
import { UserType } from "./user.type";

@ObjectType()
export class LoginType implements LoginTypeModel {
  @Field(() => UserType, { description: "user object" })
  user: UserType;

  @Field(() => String, { description: "authentication token" })
  token: string;
}
