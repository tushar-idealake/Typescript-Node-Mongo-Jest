export class SecretNotFoundError extends Error {
  constructor() {
    super();
    this.message = "Secret was not found";
    this.name = "SecretNotFoundError";
  }
}
