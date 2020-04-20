import { api } from ".";

describe("api", () => {
  it("returns a response", async () => {
    const response = await api(undefined);
    const text = await response.text();
    expect(text).toEqual("Hello, world!");
  });
});
