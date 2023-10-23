import { SercretValidationError } from "../../src/SercretValidationError";

describe("SercretValidationError tests", () => {
  it("should create a SercretValidationError error", () => {
    const error = new SercretValidationError("Secret is too short");
    expect(error).toBeInstanceOf(
      SercretValidationError
    );
    expect(error.name).toBe("SercretValidationError");
    expect(error.message).toBe("Secret is too short");
  });
});
