import supertest from "supertest";
import server from "../../src/server";
import { SecretModel } from "../../src/infra/repositories/mongo/SecretModel";

const request = supertest(server);

describe("Get Secrets Integration tests", () => {
  it("Should return an error when urlId provided is too short", async () => {
    const response = await request.get("/api/v1/secrets/2short");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "UrlIdValidationError",
      message: "UrlId is too short",
    });
  });
  it("Should return an error when secret does not exist in the system", async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue(null);
    const response = await request.get("/api/v1/secrets/123456qwert_key");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      name: "SecretNotFoundError",
      message: "Secret was not found",
    });
  });
  it("Should retrieve a secret from the system", async () => {
    SecretModel.findOne = jest.fn().mockResolvedValue({ secret: "btsaction" });
    const response = await request.get("/api/v1/secrets/123456qwert_key");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      secret: "btsaction",
    });
  });
  it("Should throw an error when unexpected error is thrown", async () => {
    SecretModel.findOne = jest.fn().mockImplementation(async () => {
      throw new Error("Connection refused");
    });

    const response = await request.get(
      "/api/v1/secrets/123qweasdmynonexistantsecret"
    );

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      name: "InternalServerError",
      message: "Something went wrong",
    });
  });
});
