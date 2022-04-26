import { ServerTest } from "./server-test";
import { expect, should } from "chai";
import { Request, Response } from "express";
import axios from "axios";

describe("Unit - Test - ServerTest", () => {
  let serverTest: ServerTest;
  const response = { bar: "bar" };
  const body = { foo: "foo" };
  const port = 9899;
  const url = `http://localhost:${port}`;

  beforeEach(async () => {
    serverTest = new ServerTest();
  });

  it("should throw an error if try to stop the server and it is already off", async () => {
    try {
      await serverTest.stop();
      throw new Error("Should not resolve");
    } catch (e) {
      const error = e as Error;
      expect(error.message).to.be.eq("ServerTest is not online yet");
      expect(error.name).to.be.eq("Error");
    }
  });

  it("should add a route and fetch result successfully", async () => {
    await serverTest.run(port);
    const handler = async (req: Request, res: Response) => {
      expect(req.body).to.be.deep.eq(body);
      res.json(response);
    };

    serverTest.addRoute({
      path: "/path",
      method: "get",
      handler,
    });

    const res = await axios.get(`${url}/path`, { data: body });
    await serverTest.stop();

    expect(res.data).to.be.deep.eq(response);
    expect(res.status).to.be.eq(200);
  });

  it("should not found route and throw an error", async () => {
    await serverTest.run(port);

    try {
      await axios.get(`${url}/path`, { data: body });
      throw new Error("Should not resolve");
    } catch (e) {
      const error = e as any;
      expect(error.response.statusText).to.be.eq("Not Found");
      expect(error.response.status).to.be.eq(404);
    }

    await serverTest.stop();
  });
});
