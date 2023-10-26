import { Secret } from "../../../src/domain/models/Secret";
import { UrlId } from "../../../src/domain/models/UrlId";
import { OneTimeSecretStorer } from "../../../src/services/OneTimeSecretStorer";
import { SecretRepository } from "../../../src/services/SecretRepository";
import { TokenGenerator } from "../../../src/services/TokenGenerator";

describe("OneTimeSecretStorer tests", () => {
  it("Should store the secret in database and return urlID", async () => {
    const secretRepository: SecretRepository = {
      getSecretByUrlId: jest.fn().mockResolvedValue(null),
      removeSecretByUrlId: jest.fn(),
      storeUrlIdAndSecret: jest.fn(),
    };

    const tokenGenerator: TokenGenerator = {
      generateToken: jest.fn().mockReturnValue("123456qwerty"),
    };
    const oneTimeSecretStorer = new OneTimeSecretStorer(
      secretRepository,
      tokenGenerator
    );
    const secret = new Secret("valid_secret_123");
    const url = new UrlId("123456qwerty");
    expect(await oneTimeSecretStorer.storeSecret(secret)).toEqual(url);
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledTimes(1);
    expect(secretRepository.storeUrlIdAndSecret).toBeCalledWith(
      secret,
      url
    );
  });
});
