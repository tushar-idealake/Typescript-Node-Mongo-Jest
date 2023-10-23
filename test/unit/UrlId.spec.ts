import { UrlId } from "../../src/UrlId";
import { UrlIdValidationError } from "../../src/UrlIdValidationError";

describe("UrlId Tests", () => {
  it("should create an instance of urlId", () => {
    expect(new UrlId("123glfefqcvbcm")).toBeInstanceOf(UrlId);
  });

  it("should throw an error when attempting to create a URLid that is too short", () => {
    expect(() => new UrlId("123g")).toThrow(
      new UrlIdValidationError("UrlId is too short")
    );
  });
});
