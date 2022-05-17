import { Field, ObjectType } from "type-graphql";
import { UserTypeModel } from "@domain/model";

@ObjectType()
export class UserType implements UserTypeModel {
  @Field(() => String, { description: "user id" })
  id: string;

  @Field(() => String, { description: "user name" })
  name: string;

  @Field(() => String, { description: "user e-mail" })
  email: string;

  @Field(() => String, { nullable: true, description: "user phone number" })
  phone?: string;
}
