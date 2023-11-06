import { Request, Response, request, response } from "express";
import { SecretsController } from "../../../../../src/infra/rest/controllers/SecretsController";
import { RequestValidationError } from "../../../../../src/infra/rest/controllers/RequestValidationError";
import { SecretValidationError } from "../../../../../src/domain/errors/SercretValidationError";
import { UrlId } from "../../../../../src/domain/models/UrlId";
import { SecretStorer } from "../../../../../src/domain/services/SecretStorer";
import { Secret } from "../../../../../src/domain/models/Secret";

describe("SecretsController Tests", () => {
  it("should throw an error if secret is not present in the body", async () => {
    const req: Request = expect.any(request);
    req.body = {
      unknownkey: "not a secret",
    };
    const res: Response = expect.any(response);

    const next = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };

    const secretsController = new SecretsController(secretStorer);
    await secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new RequestValidationError("Request Body format is not valid")
    );
  });
  it("should throw an error if secret is not string", async () => {
    const req: Request = expect.any(request);
    req.body = {
      secret: 6969,
    };
    const res: Response = expect.any(response);

    const next = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };

    const secretsController = new SecretsController(secretStorer);
    await secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new RequestValidationError("Secret is not a string")
    );
  });
  it("should throw an error if secret is too short", async () => {
    const req: Request = expect.any(request);
    req.body = {
      secret: "11",
    };
    const res: Response = expect.any(response);

    const next = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest.fn(),
    };

    const secretsController = new SecretsController(secretStorer);
    await secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(
      new SecretValidationError("Secret is too short")
    );
  });
  it("should store the secret and return the urlId", async () => {
    const req: Request = expect.any(request);
    req.body = {
      secret: "valid_testing_secret",
    };
    const res: Response = expect.any(response);
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    const next = jest.fn();

    const secretStorer: SecretStorer = {
      storeSecret: jest
        .fn()
        .mockResolvedValue(new UrlId("1234567890_valid_stuff")),
    };

    const secretsController = new SecretsController(secretStorer);
    await secretsController.storeSecret(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(secretStorer.storeSecret).toBeCalledTimes(1);
    expect(secretStorer.storeSecret).toBeCalledWith(
      new Secret("valid_testing_secret")
    );
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith(new UrlId("1234567890_valid_stuff"));
  });
});
