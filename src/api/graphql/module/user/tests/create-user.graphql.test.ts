import { Repositories } from "@data/db/repositories";
import { CreateUserInputModel, UserTypeModel } from "@domain/model/user.model";
import { Requester } from "@test/requester";
import { Seed } from "@test/seed";
import { expect } from "chai";
import Container from "typedi";

describe("Graphql - UserResolver - CreateUser", () => {
  let requester: Requester;
  let seed: Seed;
  let repositories: Repositories;
  const query = `
    mutation CreateUser($data: CreateUserInput!) {
      createUser(data: $data) {
        id
        name
        email
        phone
      }
    }
  `;

  interface Response {
    createUser: UserTypeModel;
  }

  const input: CreateUserInputModel = {
    email: "valid@email.com",
    password: "valid-password1233",
    name: "Name",
    phone: "99999999999",
  };

  before(() => {
    seed = Container.get(Seed);
    repositories = Container.get(Repositories);
  });

  beforeEach(async () => {
    requester = new Requester();
  });

  afterEach(async () => {
    await Repositories.clear();
  });

  it("should create an user correctly", async () => {
    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: input,
    });

    const user = await repositories.userRespository.findOne({
      email: input.email,
    });

    expect(response.data.createUser).to.be.deep.eq({
      email: input.email,
      name: input.name,
      phone: input.phone,
      id: user.id,
    });
  });

  it("should throw an error if password is not valid", async () => {
    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: {
        ...input,
        password: "invalid-password",
      },
    });

    const user = await repositories.userRespository.findOne({
      email: input.email,
    });

    expect(user).to.be.undefined;
    expect(response.errors).to.be.deep.eq([
      {
        message: "Invalid Input",
        code: 400,
        details: "Invalid password",
      },
    ]);
  });

  it("should create an user without phone number", async () => {
    input.phone = undefined;
    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: input,
    });

    const user = await repositories.userRespository.findOne({
      email: input.email,
    });

    expect(response.data.createUser).to.be.deep.eq({
      email: input.email,
      name: input.name,
      phone: null,
      id: user.id,
    });
  });

  it("should not create an user with same email", async () => {
    await seed.userSeed.create([{ email: input.email }]);

    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: input,
    });

    expect(response.errors).to.be.deep.eq([
      {
        message: "Invalid Input",
        code: 400,
        details: "Invalid e-mail",
      },
    ]);
  });

  it("should not create an user with invalid email", async () => {
    input.email = "invalid-email";
    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: input,
    });

    const user = await repositories.userRespository.findOne({
      email: input.email,
    });

    expect(user).to.be.undefined;
    expect(response.errors).to.be.deep.eq([
      {
        message: "Invalid input",
        code: 401,
        details: "Argument Validation Error",
      },
    ]);
  });
});
