import { SecretValidationError } from "../errors/SercretValidationError";

export class Secret {
  constructor(private secret: string) {
    if (secret.length < 3)
      throw new SecretValidationError("Secret is too short");
  }
}
