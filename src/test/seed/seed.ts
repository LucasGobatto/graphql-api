import { Service } from "typedi";
import { UserSeed } from "./user.seed";

@Service()
export class Seed {
  constructor(readonly userSeed: UserSeed) {}

  async run() {
    await this.userSeed.create([...new Array(5)]);
  }
}
