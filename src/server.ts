import { Application } from "./Application";
import { Route } from "./Route";
import { SecretsByIdController } from "./SecretsByIdController";
import { SecretsByIdRoute } from "./SecretsByIdRoute";
import { Secret } from "./domain/models/Secret";
import { UrlId } from "./domain/models/UrlId";
import { SecretRetriever } from "./services/SecretRetriever";

const secretRetriever: SecretRetriever = {
  retrieveSecretByUrlId: function (urlId: UrlId): Promise<Secret> {
    throw new Error("Function not implemented.");
  },
};

const secretsByIdController = new SecretsByIdController(secretRetriever);
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);

const routeList: Route[] = [];

routeList.push(secretsByIdRoute);

const app = new Application(routeList);

const expressApplication = app.getExpressApplication();

export default expressApplication;
