import { Request, Response, request, response } from "express";
import { SecretRetriever } from "../../../../../src/domain/services/SecretRetriever";
import { SecretsByIdController } from "../../../../../src/infra/rest/controllers/SecretsByIdController";
import { SecretNotFoundError } from "../../../../../src/domain/errors/SecretNotFoundError";
import { UrlIdValidationError } from "../../../../../src/domain/errors/UrlIdValidationError";
import { UrlId } from "../../../../../src/domain/models/UrlId";
import { Secret } from "../../../../../src/domain/models/Secret";

describe("SecretByIdController Tests", () => {
  it("should throw an error if the urlId is too short", async () => {
    const req: Request = expect.any(request);
    req.params = { urlId: "xyz12" };
    const res: Response = expect.any(response);

    const next = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecretByUrlId: jest.fn(),
    };

    const secretsByIdController = new SecretsByIdController(secretRetriever);
    await secretsByIdController.retrieveSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new UrlIdValidationError("UrlId is too short"));
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(0);
  });
  it("should throw an error if the secret was not found", async () => {
    const req: Request = expect.any(request);
    req.params = { urlId: "1234qwertynon_existant_secret" };
    const res: Response = expect.any(response);

    const next = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecretByUrlId: jest.fn().mockImplementation(async () => {
        throw new SecretNotFoundError();
      }),
    };

    const secretsByIdController = new SecretsByIdController(secretRetriever);
    await secretsByIdController.retrieveSecret(req, res, next);

    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(new SecretNotFoundError());
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(1);
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledWith(
      new UrlId("1234qwertynon_existant_secret")
    );
  });
  it("should respond with a secret when found", async () => {
    const req: Request = expect.any(request);
    req.params = { urlId: "1234qwertynon_existant_secret" };
    const res: Response = expect.any(response);

    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn();

    const next = jest.fn();

    const secretRetriever: SecretRetriever = {
      retrieveSecretByUrlId: jest
        .fn()
        .mockResolvedValue(new Secret("secret_2023")),
    };

    const secretsByIdController = new SecretsByIdController(secretRetriever);
    await secretsByIdController.retrieveSecret(req, res, next);

    expect(next).toBeCalledTimes(0);
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledTimes(1);
    expect(secretRetriever.retrieveSecretByUrlId).toBeCalledWith(
      new UrlId("1234qwertynon_existant_secret")
    );
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(res.json).toBeCalledWith(new Secret("secret_2023"));
  });
});
