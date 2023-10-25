import supertest from "supertest";
import server from "../../src/server";
import { SecretModel } from "../../src/infra/repositories/SecretModel";

const request = supertest(server);

describe("Store Secrets Integration tests", () => {
  it("should return an error if the body is not present in the request", async () => {
    const response = await request.post("/api/v1/secrets");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "RequestValidationError",
      message: "Request Body is not provided",
    });
  });
  xit("should return an error if the body does not have secret", async () => {});
  xit("should return an error if the secret is not a string", async () => {});
  xit("should return an error if the secret is too short", async () => {});
  xit("should store the secret and return the urlid", async () => {});
  xit("should return an unhandled exception error", async () => {});
});
