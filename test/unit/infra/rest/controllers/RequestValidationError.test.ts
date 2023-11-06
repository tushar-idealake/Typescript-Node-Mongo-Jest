import { RequestValidationError } from "../../../../../src/infra/rest/controllers/RequestValidationError";

describe("RequestValidationError tests", () => {
  it("should create a RequestValidationError error", () => {
    const error = new RequestValidationError("Request Body is not provided");
    expect(error).toBeInstanceOf(RequestValidationError);
    expect(error.name).toBe("RequestValidationError");
    expect(error.message).toBe("Request Body is not provided");
  });
});
