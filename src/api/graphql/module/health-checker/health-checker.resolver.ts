import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { HealthCheckerModel } from "@domain/model";
import { HealthCheckerType } from "./health-checker.type";

@Service()
@Resolver()
export class HealthCheckerResolver {
  @Query(() => HealthCheckerType)
  async healthChecker(): Promise<HealthCheckerModel> {
    return { status: "Ok" };
  }
}