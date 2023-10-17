import { Application } from "./Application";
import { Route } from "./Route";
import { SecretsByIdController } from "./SecretsByIdController";
import { SecretsByIdRoute } from "./SecretsByIdRoute";

const secretsByIdController = new SecretsByIdController();
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);

const routeList: Route[] = [];

routeList.push(secretsByIdRoute);

const app = new Application(routeList);

const expressApplication = app.getExpressApplication();

export default expressApplication;
