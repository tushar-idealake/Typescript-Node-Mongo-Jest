import { Application } from "./rest/Application";
import { Route } from "./rest/Route";
import { SecretsByIdController } from "./rest/SecretsByIdController";
import { SecretsByIdRoute } from "./rest/SecretsByIdRoute";

const secretsByIdController = new SecretsByIdController();
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);

const routeList: Route[] = [];

routeList.push(secretsByIdRoute);

const app = new Application(routeList);

const expressApplication = app.getExpressApplication();

export default expressApplication;
