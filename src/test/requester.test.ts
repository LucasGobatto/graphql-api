import { expect } from "chai";
import { Requester } from "./requester";
import { ServerTest } from "./server-test";

describe("Unit - Test - Requester", () => {
  let requester: Requester;
  let server: ServerTest;

  beforeEach(async () => {
    requester = new Requester();
    server = new ServerTest();

    await server.run();
  });

  it("should throw an error if query was not defined", async () => {
    try {
      await requester.makeRequest();
      throw new Error("Should not resolve");
    } catch (e) {
      const error = e as Error;
      expect(error.message).to.be.eq(
        "Must set a query before make the request"
      );
    }
  });
});
