import { Secret } from "../../../../src/domain/models/Secret";
import { UrlId } from "../../../../src/domain/models/UrlId";
import { OneTimeSecretStorer } from "../../../../src/domain/services/OneTimeSecretStorer";
import { TokenGenerator } from "../../../../src/domain/services/TokenGenerator";
import { SecretRepository } from "../../../../src/infra/repositories/SecretRepository";


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
