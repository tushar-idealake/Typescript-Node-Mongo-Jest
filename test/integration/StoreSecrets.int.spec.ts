import supertest from "supertest";
import server from "../../src/server";
import { SecretModel } from "../../src/infra/repositories/mongo/SecretModel";

const request = supertest(server);

describe("Store Secrets Integration tests", () => {
  it("should return an error if the body is not present in the request", async () => {
    const response = await request.post("/api/v1/secrets");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "RequestValidationError",
      message: "Request Body format is not valid",
    });
  });
  it("should return an error if the body does not have secret", async () => {
    const response = await request.post("/api/v1/secrets").send({
      secretlocator: "notsosecret",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "RequestValidationError",
      message: "Request Body format is not valid",
    });
  });
  it("should return an error if the secret is not a string", async () => {
    const response = await request.post("/api/v1/secrets").send({
      secret: 1234,
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "RequestValidationError",
      message: "Secret is not a string",
    });
  });
  it("should return an error if the secret is too short", async () => {
    const response = await request.post("/api/v1/secrets").send({
      secret: "11",
    });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "SecretValidationError",
      message: "Secret is too short",
    });
  });
  it("should store the secret and return the urlid", async () => {
    SecretModel.create = jest.fn();
    const response = await request.post("/api/v1/secrets").send({
      secret: "valid_secret",
    });
    expect(response.status).toBe(201);
    expect(response.body.urlId.length).toBeGreaterThanOrEqual(10);
  });
  it("should return an unhandled exception error", async () => {
    SecretModel.create = jest.fn().mockImplementation(async () => {
      throw Error("Server memory is full");
    });
    const response = await request.post("/api/v1/secrets").send({
      secret: "valid_secret",
    });
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      name: "InternalServerError",
      message: "Something went wrong"
    });
  });
});
