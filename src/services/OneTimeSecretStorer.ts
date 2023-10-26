import { Secret } from "../domain/models/Secret";
import { UrlId } from "../domain/models/UrlId";
import { SecretRepository } from "./SecretRepository";
import { SecretStorer } from "./SecretStorer";
import { TokenGenerator } from "./TokenGenerator";

export class OneTimeSecretStorer implements SecretStorer {
  constructor(
    private secretRepository: SecretRepository,
    private tokenGenerator: TokenGenerator
  ) {}
  async storeSecret(secret: Secret): Promise<UrlId> {
    const token = this.tokenGenerator.generateToken();
    const urlId = new UrlId(token);
    await this.secretRepository.storeUrlIdAndSecret(secret, urlId);
    return urlId;
  }
}