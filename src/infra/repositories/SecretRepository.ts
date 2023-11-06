import { Secret } from "../../domain/models/Secret";
import { UrlId } from "../../domain/models/UrlId";


export interface SecretRepository {
  getSecretByUrlId(urlId: UrlId): Promise<Secret | null>;
  removeSecretByUrlId(urlId: UrlId): Promise<void>;
  storeUrlIdAndSecret(secret: Secret, urlId: UrlId):Promise<void>
}
