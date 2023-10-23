import express from "express";
import { Route } from "./Route";
import { errorHandler } from "./infra/rest/middlewares/ErrorHandler";

export class Application {
  private expressApp: express.Application = express();
  constructor(private routeList: Route[]) {
    this.routeList.forEach((route) => route.mountRoute(this.expressApp)); // Mounting Routes
    this.expressApp.use(errorHandler); // Adding Error Handling
  }
  getExpressApplication(): express.Application {
    return this.expressApp;
  }
}
