import { SecretValidationError } from "../../../../src/domain/errors/SercretValidationError";

describe("SecretValidationError tests", () => {
  it("should create a SecretValidationError error", () => {
    const error = new SecretValidationError("Secret is too short");
    expect(error).toBeInstanceOf(SecretValidationError);
    expect(error.name).toBe("SecretValidationError");
    expect(error.message).toBe("Secret is too short");
  });
});
