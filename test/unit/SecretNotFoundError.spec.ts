import { SecretNotFoundError } from "../../src/SecretNotFoundError";
import { UrlIdValidationError } from "../../src/UrlIdValidationError";

describe("SecretNotFoundError tests", () => {
  it("should create a SecretNotFoundError error", () => {
    const error = new SecretNotFoundError();
    expect(error).toBeInstanceOf(
      SecretNotFoundError
    );
    expect(error.name).toBe("SecretNotFoundError");
    expect(error.message).toBe("Secret was not found");
  });
});
