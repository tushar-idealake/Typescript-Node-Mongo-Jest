import { UrlIdValidationError } from "./UrlIdValidationError";

export class UrlId {
  constructor(private urlId: string) {
    if (urlId.length < 10) throw new UrlIdValidationError("URLId is too short");
  }
}
