import { Application } from "./Application";
import { Route } from "./Route";
import { SecretsByIdController } from "./SecretsByIdController";
import { SecretsByIdRoute } from "./SecretsByIdRoute";
import { MongoSecretRepository } from "./infra/repositories/MongoSecretRepository";
import { OneTimeSecretRetriever } from "./services/OneTimeSecretRetriever";

const secretRepository = new MongoSecretRepository();
const secretRetriever = new OneTimeSecretRetriever(secretRepository);

const secretsByIdController = new SecretsByIdController(secretRetriever);
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);

const routeList: Route[] = [];

routeList.push(secretsByIdRoute);

const app = new Application(routeList);

const expressApplication = app.getExpressApplication();

export default expressApplication;
