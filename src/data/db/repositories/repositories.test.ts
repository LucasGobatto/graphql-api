import Container from "typedi";
import { getRepository, Repository } from "typeorm";
import { expect } from "chai";
import { Seed } from "@test/seed";
import { UserEntity } from "@entity";
import { Repositories } from "./repositories";

describe("Unit - Data - Repositories", async () => {
  let seed: Seed;
  let repositories: Repositories;
  let userRespository: Repository<UserEntity>;
  let user: UserEntity;

  before(() => {
    seed = Container.get(Seed);
    repositories = Container.get(Repositories);
    userRespository = getRepository(UserEntity);
  });

  beforeEach(async () => {
    [user] = await seed.userSeed.create();
  });

  it("should fetch user correctly", async () => {
    const foundUser = await repositories.userRespository.findOne(user.id);

    expect(foundUser).to.be.deep.eq(user);

    userRespository.clear();
  });

  it("should clear repository correctly", async () => {
    await Repositories.clear();

    const users = await userRespository.find();

    expect(users).to.have.lengthOf(0);
  });
});
