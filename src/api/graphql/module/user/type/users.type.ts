import { Field, ObjectType } from "type-graphql";
import { UsersTypeModel } from "@domain/model";
import { UserType } from "./user.type";

@ObjectType()
export class UsersType implements UsersTypeModel {
  @Field(() => [UserType], { description: "all found users" })
  users: UserType[];

  @Field(() => Number, { description: "number of found users" })
  count: number;

  @Field(() => Boolean, { description: "have next users to fecth" })
  hasNextPage: boolean;

  @Field(() => Boolean, { description: "have previous users to fetch" })
  hasPreviousPage: boolean;
}
