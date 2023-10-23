import { UrlId } from "./UrlId";
import { Application } from "./rest/Application";
import { Route } from "./rest/Route";
import { Secret } from "./rest/Secret";
import { SecretRetriever } from "./rest/SecretRetriever";
import { SecretsByIdController } from "./rest/SecretsByIdController";
import { SecretsByIdRoute } from "./rest/SecretsByIdRoute";

const secretRetriever: SecretRetriever = {
    retrieveSecretByUrlId: function (urlId: UrlId): Promise<Secret> {
        throw new Error("Function not implemented.");
    }
}

const secretsByIdController = new SecretsByIdController(secretRetriever);
const secretsByIdRoute = new SecretsByIdRoute(secretsByIdController);

const routeList: Route[] = [];

routeList.push(secretsByIdRoute);

const app = new Application(routeList);

const expressApplication = app.getExpressApplication();

export default expressApplication;
