import { UserEntity } from "@data/db/entity";
import { expect } from "chai";
import Container from "typedi";
import { getRepository, Repository } from "typeorm";
import { Seed } from "./seed";

describe("Unit - Test - Seed", () => {
  let seed: Seed;
  let repostiory: Repository<UserEntity>;

  before(() => {
    seed = Container.get(Seed);
    repostiory = getRepository(UserEntity);
  });

  afterEach(async () => {
    await repostiory.clear();
  });

  it("should populate one user correctly", async () => {
    const users = await seed.userSeed.create([{}]);

    const user = await repostiory.findOne(users[0].id);

    expect(users).to.have.lengthOf(1);
    expect(user).to.not.be.undefined;
    expect(user.email).to.be.eq(users[0].email);
    expect(user.password).to.be.eq(users[0].password);
    expect(user.phone).to.be.eq(users[0].phone);
  });

  it("should populate 5 users correctly", async () => {
    const seedUsers = await seed.userSeed.create();

    const users = await repostiory.findByIds(seedUsers.map(({ id }) => id));

    expect(users).to.have.lengthOf(5);
    expect(seedUsers).to.have.lengthOf(5);
  });

  it("should create one user correctly", async () => {
    const hashedPassword = "hashed-password";

    const [user] = await seed.userSeed.create([{ password: hashedPassword }]);

    expect(user.name).to.be.eq("User Name 1");
    expect(user.email).to.be.eq("fake1@email.com");
    expect(user.password).to.be.eq(hashedPassword);
    expect(user.phone).to.be.eq("99999999999");
  });
});
