import { expect } from "chai";
import { HealthCheckerModel } from "domain/model";
import { Request, Response } from "express";
import { Requester } from "./requester";
import { ServerTest } from "./server-test";

interface ResponseData {
  foo: string;
  bar: string;
}

describe("Unit - Test - Requester", () => {
  let requester: Requester;
  let server: ServerTest;
  const path = "/base-path";
  const body = { foo: "foo" };
  const responseData: ResponseData = {
    foo: "foo",
    bar: "bar",
  };

  const query = `
    query HealthChecker {
      healthChecker {
        status
      }
    }
  `;

  beforeEach(async () => {
    requester = new Requester();
    server = new ServerTest();

    await server.run();
  });

  afterEach(async () => {
    await server.stop();
  });

  const handler = async (req: Request, res: Response) => {
    expect(req.body).to.be.deep.eq(body);

    res.json(responseData);
  };

  it("should get 200", async () => {
    requester.setBaseUrlPort(8888);
    await server.addRoute({
      handler,
      method: "post",
      path,
    });

    const response = await requester.makeRestRequest<ResponseData>(
      "POST",
      path,
      body
    );

    expect(response.data).to.be.deep.eq(responseData);
    expect(response.status).to.be.eq(200);
  });

  it("should check server health", async () => {
    const response = await requester.makeGraphQLRequest<{
      healthChecker: HealthCheckerModel;
    }>(query);

    expect(response.data.healthChecker.status).to.be.eq("Ok");
  });
});
