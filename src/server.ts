import { Application } from "./Application";
import { Route } from "./Route";
import { SecretsByIdController } from "./SecretsByIdController";
import { SecretsByIdRoute } from "./SecretsByIdRoute";
import { SecretsController } from "./SecretsController";
import { SecretsRoute } from "./SecretsRoute";
import { MongoSecretRepository } from "./infra/repositories/MongoSecretRepository";
import { OneTimeSecretRetriever } from "./services/OneTimeSecretRetriever";

const secretRepository = new MongoSecretRepository();
const secretRetriever = new OneTimeSecretRetriever(secretRepository);

const secretsByIdController = new SecretsByIdController(secretRetriever);
const secretsController = new SecretsController();
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);
const secretsRoute = new SecretsRoute(secretsController);

const routeList: Route[] = [];

routeList.push(secretsByIdRoute);
routeList.push(secretsRoute);

const app = new Application(routeList);

const expressApplication = app.getExpressApplication();

export default expressApplication;
