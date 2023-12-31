import { UrlIdValidationError } from "../../../../src/domain/errors/UrlIdValidationError";

describe("UrlIdValidationError tests", () => {
  it("should create a UrlIdValidationError error", () => {
    const error = new UrlIdValidationError("UrlId is too short");
    expect(error).toBeInstanceOf(UrlIdValidationError);
    expect(error.name).toBe("UrlIdValidationError");
    expect(error.message).toBe("UrlId is too short");
  });
});
