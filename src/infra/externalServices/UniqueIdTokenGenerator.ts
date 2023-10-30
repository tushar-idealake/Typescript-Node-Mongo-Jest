import { TokenGenerator } from "../../services/TokenGenerator";
import uniqid from "uniqid";

export class UniqueIdTokenGenerator implements TokenGenerator {
  generateToken(): string {
    return uniqid();
  }
}
