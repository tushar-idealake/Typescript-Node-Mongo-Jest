import { SercretValidationError } from "../../src/SercretValidationError";
import { Secret } from "../../src/rest/Secret";

describe("Secret Test", () => {
    it("should create an instance of Secret", () => {
        expect(new Secret('superusersecret')).toBeInstanceOf(Secret);
    })
    it("should throw an error when secret is too short", () => {
        expect(() => new Secret('1')).toThrow(new SercretValidationError('Secret is too short'));
    })
});
