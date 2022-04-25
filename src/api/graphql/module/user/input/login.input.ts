import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { LoginInputModel } from "@domain/model/user.model";

@InputType()
export class LoginInput implements LoginInputModel {
  @Field({ description: "user email" })
  @IsEmail()
  email: string;

  @Field({ description: "user password" })
  password: string;
}
