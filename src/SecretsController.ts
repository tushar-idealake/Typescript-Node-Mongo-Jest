import { NextFunction, Request, Response } from "express";

export class SecretsController {
  storeSecret = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    throw new Error("Method not implemented yet!");
  };
}
