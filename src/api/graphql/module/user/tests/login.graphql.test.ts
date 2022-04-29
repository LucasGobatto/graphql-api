import Container from "typedi";
import { Repositories } from "@data/db/repositories";
import { UserEntity } from "@entity";
import { LoginTypeModel } from "@domain/model/user.model";
import { Requester } from "@test/requester";
import { Seed } from "@test/seed";
import { expect } from "chai";
import { JWTService } from "@core/security/jwt";

describe("GraphlQL - UserResolver - Login", () => {
  let seed: Seed;
  let repositories: Repositories;
  let requester: Requester;
  let jwtService: JWTService;

  interface Response {
    login: LoginTypeModel;
  }

  const query = `
    mutation Login($data: LoginInput!) {
      login(data: $data) {
        token
        user {
          id
          name
          email
          phone
        }
      }
    }
  `;

  before(() => {
    seed = Container.get(Seed);
    repositories = Container.get(Repositories);
    jwtService = Container.get(JWTService);
  });

  beforeEach(async () => {
    requester = new Requester();
  });

  afterEach(async () => {
    await Repositories.clear();
  });

  const createUser = (user: Partial<UserEntity> = {}) => {
    return seed.userSeed.create([{ ...user }]);
  };

  it("should make login successfully", async () => {
    const validPassword = "1234qwer";
    const [user] = await createUser({ password: validPassword });
    const userData = {
      name: user.name,
      id: user.id,
    };

    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: { email: user.email, password: validPassword },
    });
    const token = response.data.login.token;
    const verifyToken = jwtService.verify(token);

    expect(verifyToken.data).to.be.deep.eq(userData);
    expect(token).to.not.be.empty;
    expect(response.data.login.user).to.be.deep.eq({
      email: user.email,
      name: user.name,
      phone: user.phone,
      id: user.id,
    });
  });

  it("should get unauthorized error if send invalid password", async () => {
    const [user] = await createUser();

    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: { email: user.email, password: "incorrect-password" },
    });

    expect(response.errors).to.have.lengthOf(1);
    expect(response.errors[0].code).to.be.eq(401);
    expect(response.errors[0].details).to.be.eq(undefined);
    expect(response.errors[0].message).to.be.eq(
      "Unauthorized. Invalid credentials"
    );
  });

  it("should get unauthorized error if send incorrect email", async () => {
    const password = "some-password";
    await createUser({ password });

    const response = await requester.makeGraphQLRequest<Response>(query, {
      data: { email: "incorrect@email.com", password },
    });

    expect(response.errors).to.have.lengthOf(1);
    expect(response.errors[0].code).to.be.eq(401);
    expect(response.errors[0].details).to.be.eq(undefined);
    expect(response.errors[0].message).to.be.eq(
      "Unauthorized. Invalid credentials"
    );
  });
});
