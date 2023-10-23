import { Request, Response, request, response } from "express";
import { SecretsByIdController } from "../../src/rest/SecretsByIdController";
import { UrlIdValidationError } from "../../src/UrlIdValidationError";
import { SecretNotFoundError } from "../../src/SecretNotFoundError";
import { SecretRetriever } from "../../src/rest/SecretRetriever";
import { UrlId } from "../../src/UrlId";
import { Secret } from "../../src/rest/Secret";

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
});
