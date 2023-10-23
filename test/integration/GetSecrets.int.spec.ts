import supertest from "supertest";
import server from "../../src/server";
import { SecretModel } from "../../src/infra/repositories/SecretModel";

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
    const response = await request.get(
      "/api/v1/secrets/123456qwertnon_existant_key"
    );

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      name: "SecretNotFoundError",
      message: "Secret was not found",
    });
  });
  xit("Should retrieve a secret from the system", () => {});
  xit("Should throw an error when unexpected error is thrown", () => {});
});
