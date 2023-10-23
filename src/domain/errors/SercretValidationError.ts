export class SercretValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SercretValidationError";
  }
}
