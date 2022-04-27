import { IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import { CreateUserInputModel } from "@domain/model/user.model";

@InputType()
export class CreateUserInput implements CreateUserInputModel {
  @Field({ description: "user name" })
  name: string;

  @Field({ description: "user password" })
  password: string;

  @Field({ description: "user e-mail" })
  @IsEmail()
  email: string;

  @Field({ nullable: true, description: "user phone number" })
  phone?: string;
}
