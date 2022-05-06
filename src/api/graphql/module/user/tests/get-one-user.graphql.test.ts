import { JWTService } from "@core/security/jwt";
import { UserEntity } from "@data/db/entity";
import { Repositories } from "@data/db/repositories";
import { UserInputModel, UserTypeModel } from "@domain/model/user.model";
import { Requester } from "@test/requester";
import { Seed } from "@test/seed";
import { expect } from "chai";
import Container from "typedi";

describe("GraphQL - UserResolver - GetOneUser", () => {
  let repositories: Repositories;
  let seed: Seed;
  let requester: Requester;
  let jwtService: JWTService;

  let user: UserEntity;
  let token: string;

  const query = `
    query GetOneUser($data: UserInput!) {
      getOneUser(data: $data) {
        id
        name
        email
        phone
      }
    }
  `;

  interface Response {
    getOneUser: UserTypeModel;
  }

  before(() => {
    repositories = Container.get(Repositories);
    seed = Container.get(Seed);
    jwtService = Container.get(JWTService);
  });

  beforeEach(async () => {
    [user] = await seed.userSeed.create();
    token = jwtService.sign({ id: user.id, name: user.name });

    requester = new Requester();
  });

  afterEach(async () => {
    await Repositories.clear();
  });

  it("should get one user successfully", async () => {
    const input: UserInputModel = {
      id: user.id,
    };

    const response = await requester
      .setToken(token)
      .makeGraphQLRequest<Response>(query, { data: input });

    expect(response.data.getOneUser).to.be.deep.eq({
      name: user.name,
      id: user.id,
      email: user.email,
      phone: user.phone,
    });
  });

  it("should get unauthorized if use invalid token", async () => {
    const input: UserInputModel = {
      id: user.id,
    };

    const response = await requester
      .setToken("invalid-token")
      .makeGraphQLRequest(query, { data: input });

    expect(response.errors).to.have.lengthOf(1);
    expect(response.errors[0]).to.be.deep.eq({
      code: 401,
      message: "Unauthorized. Invalid credentials",
      details: "jwt malformed",
    });
  });

  it("should get bad request if search for invalid user", async () => {
    const input: UserInputModel = {
      id: "invalid-id",
    };

    const response = await requester
      .setToken(token)
      .makeGraphQLRequest(query, { data: input });

    expect(response.errors).to.have.lengthOf(1);
    expect(response.errors[0]).to.be.deep.eq({
      message: "Invalid Input",
      code: 400,
    });
  });

  it("should get not found if search for invalid user", async () => {
    await repositories.userRespository.clear();
    const input: UserInputModel = {
      id: user.id,
    };

    const response = await requester
      .setToken(token)
      .makeGraphQLRequest(query, { data: input });

    expect(response.errors).to.have.lengthOf(1);
    expect(response.errors[0]).to.be.deep.eq({
      message: "Not found",
      code: 404,
      details: "User not found",
    });
  });

  it("should get bad request if not send id", async () => {
    const input: UserInputModel = {
      id: null,
    };

    const response = await requester
      .setToken(token)
      .makeGraphQLRequest(query, { data: input });

    expect(response.errors).to.have.lengthOf(1);
    expect(response.errors[0]).to.be.deep.eq({
      message: "Invalid Input",
      code: 400,
      details: "Invalid id",
    });
  });
});
