import { Field, InputType } from "type-graphql";
import { UserInputModel } from "@domain/model/user.model";

@InputType()
export class UserInput implements UserInputModel {
  @Field({ defaultValue: "user id" })
  id: string;
}
