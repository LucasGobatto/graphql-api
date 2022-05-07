import { JWTService } from "@core/security/jwt";
import { UserEntity } from "@data/db/entity";
import { Repositories } from "@data/db/repositories";
import { UsersInputModel, UsersTypeModel } from "@domain/model/user.model";
import { Requester } from "@test/requester";
import { Seed } from "@test/seed";
import { expect } from "chai";
import Container from "typedi";

describe("GraphQL - UserResolver - GetManyUsers", () => {
  let seed: Seed;
  let requester: Requester;
  let jwtService: JWTService;

  let users: UserEntity[];
  let user: UserEntity;

  const query = `
    query GetManyUsers($data: UsersInput!) {
      getManyUsers(data: $data) {
        users { 
          id
          name
          email
          phone
        }
        hasNextPage
        hasPreviousPage
        count
      }
    }
  `;

  interface Response {
    getManyUsers: UsersTypeModel;
  }

  before(() => {
    seed = Container.get(Seed);
    jwtService = Container.get(JWTService);
  });

  beforeEach(async () => {
    [user, ...users] = await seed.userSeed.create();
    const token = jwtService.sign({ id: user.id, name: user.name });

    requester = new Requester();
    requester.setToken(token);
  });

  afterEach(async () => {
    await Repositories.clear();
  });

  it("should get many users successfully", async () => {
    const input: UsersInputModel = {
      limit: 10,
      offset: 0,
    };

    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: input,
    });

    expect(response.data.getManyUsers.hasNextPage).to.be.false;
    expect(response.data.getManyUsers.hasPreviousPage).to.be.false;
    expect(response.data.getManyUsers.count).to.be.eq(users.length + 1);
    checkUsers(response.data);
  });

  it("should get unauthorized if send invalid token", async () => {
    const input: UsersInputModel = {
      limit: 10,
      offset: 0,
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

  it("should get all users even if dont send limit and offset", async () => {
    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: {},
    });

    expect(response.data.getManyUsers.hasNextPage).to.be.false;
    expect(response.data.getManyUsers.hasPreviousPage).to.be.false;
    expect(response.data.getManyUsers.count).to.be.eq(users.length + 1);
    checkUsers(response.data);
  });

  it("should get bad request if send invalid offset", async () => {
    const input: UsersInputModel = {
      limit: 10,
      offset: -1,
    };

    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: input,
    });

    expect(response.errors).to.have.lengthOf(1);
    expect(response.errors[0]).to.be.deep.eq({
      message: "Invalid Input",
      code: 400,
    });
  });

  it("should get bad request if send invalid limit", async () => {
    const input: UsersInputModel = {
      limit: -1,
      offset: 0,
    };

    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: input,
    });

    expect(response.errors).to.have.lengthOf(1);
    expect(response.errors[0]).to.be.deep.eq({
      message: "Invalid Input",
      code: 400,
    });
  });

  it("should skip 2 users correctly", async () => {
    const input: UsersInputModel = {
      limit: 10,
      offset: 2,
    };

    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: input,
    });

    expect(response.data.getManyUsers.hasNextPage).to.be.false;
    expect(response.data.getManyUsers.hasPreviousPage).to.be.true;
    expect(response.data.getManyUsers.count).to.be.eq(users.length + 1);
    checkUsers(response.data);
  });

  it("should fetch 2 users correctly", async () => {
    const input: UsersInputModel = {
      limit: 2,
      offset: 0,
    };

    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: input,
    });

    expect(response.data.getManyUsers.hasNextPage).to.be.true;
    expect(response.data.getManyUsers.hasPreviousPage).to.be.false;
    expect(response.data.getManyUsers.count).to.be.eq(users.length + 1);
    checkUsers(response.data);
  });

  function checkUsers(response: Response) {
    response.getManyUsers.users.forEach((responseUser) => {
      const currentUser =
        responseUser.id === user.id
          ? user
          : users.find(({ id }) => id === responseUser.id);

      expect(responseUser).to.be.deep.eq({
        name: currentUser.name,
        id: currentUser.id,
        email: currentUser.email,
        phone: currentUser.phone,
      });
    });
  }
});
