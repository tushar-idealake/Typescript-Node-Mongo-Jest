import mongoose from "mongoose";
import { Secret } from "../../../domain/models/Secret";
import { UrlId } from "../../../domain/models/UrlId";
import { SecretRepository } from "../SecretRepository";
import { SecretModel } from "./SecretModel";

export class MongoSecretRepository implements SecretRepository {
  constructor() {
    if (mongoose.connection.readyState !== 1) {
      mongoose.connect(
        "mongodb+srv://tushar_admin:XEkyRYUsCd4d9f4y@cluster0.u8idhjw.mongodb.net/test?retryWrites=true&w=majority"
      );
    }
  }

  async storeUrlIdAndSecret(secret: Secret, urlId: UrlId): Promise<void> {
    await SecretModel.create({
      secret: secret.toString(),
      urlId: urlId.toString(),
    });
  }
  async removeSecretByUrlId(urlId: UrlId): Promise<void> {
    const result = await SecretModel.deleteOne({ urlId: urlId.toString() });
  }
  async getSecretByUrlId(urlId: UrlId): Promise<Secret | null> {
    const doc = await SecretModel.findOne({ urlId: urlId.toString() });
    if (doc == null) return null;
    return new Secret(doc.secret);
  }
}
