import { UrlIdValidationError } from "../../../../src/domain/errors/UrlIdValidationError";
import { UrlId } from "../../../../src/domain/models/UrlId";

describe("UrlId Tests", () => {
  it("should create an instance of urlId", () => {
    expect(new UrlId("123glfefqcvbcm")).toBeInstanceOf(UrlId);
  });

  it("should throw an error when attempting to create a URLid that is too short", () => {
    expect(() => new UrlId("123g")).toThrow(
      new UrlIdValidationError("UrlId is too short")
    );
  });
  it("should return string representation on toString method ", () => {
    expect(new UrlId("123456_valid_secret").toString()).toBe(
      "123456_valid_secret"
    );
  });
});
