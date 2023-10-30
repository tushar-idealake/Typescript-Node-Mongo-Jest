import { UniqueIdTokenGenerator } from "../../../../src/infra/externalServices/UniqueIdTokenGenerator";

jest.mock("uniqid");
import uniqid from "uniqid";
const mockUniqId = uniqid as jest.MockedFunction<typeof uniqid>;

describe("UniqueIdTokenGenerator Test", () => {
  it("should generate a token", () => {
    mockUniqId.mockReturnValue("random_valid_token");
    const uniqueIdTokenGenerator = new UniqueIdTokenGenerator();
    expect(uniqueIdTokenGenerator.generateToken()).toBe("random_valid_token");
  });
});
