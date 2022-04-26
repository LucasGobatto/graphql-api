import { RequestLogger } from "@core/decorators";
import { Get, JsonController } from "routing-controllers";

@JsonController()
export class WarmUpController {
  @Get("/warm-up")
  @RequestLogger("WarmUpController")
  async warmUp() {
    return { awake: true };
  }
}
