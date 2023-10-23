import mongoose from "mongoose";
import { MongoSecretRepository } from "../../../../src/infra/repositories/MongoSecretRepository";
import { UrlId } from "../../../../src/domain/models/UrlId";
import { SecretModel } from "../../../../src/infra/repositories/SecretModel";

describe("MongoSecretRepository tests", () => {
  it("Should connect to the database", () => {
    mongoose.connect = jest.fn();
    new MongoSecretRepository();
    expect(mongoose.connect).toBeCalledTimes(1);
    expect(mongoose.connect).toBeCalledWith(
      "mongodb+srv://tushar_admin:XEkyRYUsCd4d9f4y@cluster0.u8idhjw.mongodb.net/test?retryWrites=true&w=majority"
    );
  });
  it("Should not connect to the database when connection is already established", async () => {
    mongoose.connect = jest.fn();
    new MongoSecretRepository();
    if(mongoose.connection.readyState !== 1) {expect(mongoose.connect).toBeCalledTimes(1)}
    else {
        expect(mongoose.connect).toBeCalledTimes(0);
    }
  });
  it("Should return a null object when secret is not found", async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue(null);
    mongoose.connect = jest.fn();
    const mongoSecretRepository = new MongoSecretRepository();
    const urlId = new UrlId("123456qwerty")
    expect(await mongoSecretRepository.getSecretByUrlId(urlId)).toBe(null)
    if(mongoose.connection.readyState === 1) {expect(mongoose.connect).toBeCalledTimes(2)}
  });
});
