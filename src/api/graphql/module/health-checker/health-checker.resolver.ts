import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { HealthCheckerModel } from "@domain/model";
import { HealthCheckerType } from "./health-checker.type";
import { LogRequest } from "@core/decorator";

@Service()
@Resolver()
export class HealthCheckerResolver {
  @Query(() => HealthCheckerType)
  @LogRequest("HealthCheckerResolver")
  async healthChecker(): Promise<HealthCheckerModel> {
    return { status: "Ok" };
  }
}
