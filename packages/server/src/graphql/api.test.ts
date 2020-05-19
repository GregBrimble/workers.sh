import { handleRequest } from ".";

describe("api", () => {
  it("returns a response", async () => {
    const response = await handleRequest(undefined);
    const text = await response.text();
    expect(text).toEqual("Hello, world!");
  });
});
