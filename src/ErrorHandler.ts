import { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
    response.status(400);
    response.json({
        name: error.name,
        message: error.message,
    })
}
