import supertest from "supertest";
import server from "../../src/server";

const request = supertest(server);
import { SecretModel } from "../../src/infra/repositories/mongo/SecretModel";

describe("Store and Retrieve Secrets E2E Tests", () => {
  beforeAll(async () => {
    await SecretModel.deleteMany({});
  });
  it("Should return an error if secret does not exist", async () => {
    const response = await request.get("/api/v1/secrets/123456qwert_key");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      name: "SecretNotFoundError",
      message: "Secret was not found",
    });
  });
  it("Should return error when secret is too short", async () => {
    const response = await request.post("/api/v1/secrets").send({
      secret: "qw",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      name: "SecretValidationError",
      message: "Secret is too short",
    });
  });
  let urlId: string;
  it("Should store the secret in system", async () => {
    const response = await request.post("/api/v1/secrets").send({
      secret: "hiddensecrets",
    });

    expect(response.status).toBe(201);
    expect(response.body.urlId.length).toBeGreaterThanOrEqual(10);
    urlId = response.body.urlId;
  });
  it("Should retrieve the secret from system", async () => {
    const response = await request.get("/api/v1/secrets/" + urlId);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      secret: "hiddensecrets",
    });
  });
  it("Should return not found error trying to retrieve same urlId", async () => {
    const response = await request.get("/api/v1/secrets/" + urlId);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Secret was not found",
      name: "SecretNotFoundError",
    });
  });
});
