import { SercretValidationError } from "../errors/SercretValidationError";

export class Secret {
  constructor(private secret: string) {
    if (secret.length < 3)
      throw new SercretValidationError("Secret is too short");
  }
}
