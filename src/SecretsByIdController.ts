import { NextFunction, Request, Response } from "express";
import { SecretRetriever } from "./services/SecretRetriever";
import { UrlId } from "./domain/models/UrlId";

export class SecretsByIdController {
  constructor(private secretRetriever: SecretRetriever) {}

  retrieveSecret = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const urlId = new UrlId(request.params.urlId);
      const secret = await this.secretRetriever.retrieveSecretByUrlId(urlId);
      response.status(200).json(secret);
    } catch (error) {
      next(error);
    }
    // if (request.params.urlId.length < 10)
    //   next(new UrlIdValidationError("UrlId is too short"));
  };
}
