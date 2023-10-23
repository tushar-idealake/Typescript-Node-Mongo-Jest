import { SecretNotFoundError } from "../../../src/domain/errors/SecretNotFoundError";
import { Secret } from "../../../src/domain/models/Secret";
import { UrlId } from "../../../src/domain/models/UrlId";
import { OneTimeSecretRetriever } from "../../../src/services/OneTimeSecretRetriever";
import { SecretRepository } from "../../../src/services/SecretRepository";

describe("OneTimeSecretRetriever tests", () => {
  it("Should throw an error if secret is not found", async () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockResolvedValue(null),
    };
    const oneTimeSecretRetriever = new OneTimeSecretRetriever(secretRepository);
    const urlId = new UrlId("123456qwerty");
    expect(oneTimeSecretRetriever.retrieveSecretByUrlId(urlId)).rejects.toThrow(
      SecretNotFoundError
    );
    expect(secretRepository.getSecretByUrlId).toBeCalledTimes(1);
    expect(secretRepository.getSecretByUrlId).toBeCalledWith(
      new UrlId("123456qwerty")
    );
  });
});
