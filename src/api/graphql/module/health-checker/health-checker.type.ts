import { HealthCheckerModel } from "@domain/model";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class HealthCheckerType implements HealthCheckerModel {
  @Field(() => String, { description: "Health status" })
  status: string;
}
