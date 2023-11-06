import { Application } from "./Application";
import { Route } from "./infra/rest/routes/Route";
import { SecretsByIdController } from "./infra/rest/controllers/SecretsByIdController";
import { SecretsByIdRoute } from "./infra/rest/routes/SecretsByIdRoute";
import { SecretsController } from "./infra/rest/controllers/SecretsController";
import { SecretsRoute } from "./infra/rest/routes/SecretsRoute";
import { UniqueIdTokenGenerator } from "./infra/externalServices/UniqueIdTokenGenerator";
import { MongoSecretRepository } from "./infra/repositories/mongo/MongoSecretRepository";
import { OneTimeSecretRetriever } from "./domain/services/OneTimeSecretRetriever";
import { OneTimeSecretStorer } from "./domain/services/OneTimeSecretStorer";

const secretRepository = new MongoSecretRepository();
const secretRetriever = new OneTimeSecretRetriever(secretRepository);

const secretsByIdController = new SecretsByIdController(secretRetriever);

const tokenGenerator = new UniqueIdTokenGenerator();

const secretStorer = new OneTimeSecretStorer(secretRepository, tokenGenerator);

const secretsController = new SecretsController(secretStorer);
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);
const secretsRoute = new SecretsRoute(secretsController);

const routeList: Route[] = [];

routeList.push(secretsByIdRoute);
routeList.push(secretsRoute);

const app = new Application(routeList);

const expressApplication = app.getExpressApplication();

export default expressApplication;
