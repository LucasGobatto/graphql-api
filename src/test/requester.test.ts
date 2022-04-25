import { expect } from "chai";
import { Requester } from "./requester";

describe("Unit - Test - Requester", () => {
  let requester: Requester;

  beforeEach(() => {
    requester = new Requester();
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
