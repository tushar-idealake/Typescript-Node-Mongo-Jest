import uniqid from "uniqid";
import { TokenGenerator } from "../../domain/services/TokenGenerator";

export class UniqueIdTokenGenerator implements TokenGenerator {
  generateToken(): string {
    return uniqid();
  }
}
