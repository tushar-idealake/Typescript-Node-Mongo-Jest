import { NextFunction, Request, Response, request, response } from "express";
import { SecretNotFoundError } from "../../../../../src/domain/errors/SecretNotFoundError";
import { UrlIdValidationError } from "../../../../../src/domain/errors/UrlIdValidationError";
import { errorHandler } from "../../../../../src/infra/rest/middlewares/ErrorHandler";

describe("ErrorHandler tests", () => {
  it("should generate an Error Response for a UrlValidationError", () => {
    const error = new UrlIdValidationError("UrlId is too short");

    const req: Request = expect.any(request);
    const res: Response = expect.any(response);

    const next: NextFunction = jest.fn();
    res.status = jest.fn();
    res.json = jest.fn();

    errorHandler(error, req, res, next);
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: "UrlIdValidationError",
      message: "UrlId is too short",
    });
  });
  it("should generate an Error Response for a SecretNotFoundError", () => {
    const error = new SecretNotFoundError();

    const req: Request = expect.any(request);
    const res: Response = expect.any(response);

    const next: NextFunction = jest.fn();
    res.status = jest.fn();
    res.json = jest.fn();

    errorHandler(error, req, res, next);
    expect(next).toBeCalledTimes(0);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith({
      name: "SecretNotFoundError",
      message: "Secret was not found",
    });
  });
});
