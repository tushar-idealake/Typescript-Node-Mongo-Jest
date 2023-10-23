import { UrlId } from "../models/UrlId";
import { Secret } from "../models/Secret";

export interface SecretRetriever {
  retrieveSecretByUrlId(urlId: UrlId): Promise<Secret>;
}
