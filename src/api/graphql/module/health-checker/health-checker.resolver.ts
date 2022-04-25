import { Query, Resolver } from "type-graphql";
import { Service } from "typedi";
import { HealthCheckerModel } from "@domain/model";
import { HealthCheckerType } from "./health-checker.type";
import { RequestLogger } from "@core/decorators";

@Service()
@Resolver()
export class HealthCheckerResolver {
  @Query(() => HealthCheckerType)
  @RequestLogger("HealthCheckerResolver")
  async healthChecker(): Promise<HealthCheckerModel> {
    return { status: "Ok" };
  }
}
