import { IsNumber } from "class-validator";
import { Field, InputType } from "type-graphql";
import { UsersInputModel } from "@domain/model/user.model";

@InputType()
export class UsersInput implements UsersInputModel {
  @Field({ defaultValue: 0, description: "number of skip" })
  @IsNumber()
  offset?: number;

  @Field({ defaultValue: 10, description: "number to get" })
  @IsNumber()
  limit?: number;
}
