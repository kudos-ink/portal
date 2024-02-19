import { stackMiddlewares } from "./middlewares/stack";
import { withCSRF } from "./middlewares/csrf";
import { withBasicAuthorization } from "./middlewares/basic-auth";

const middlewares = [
  withBasicAuthorization,
  //, withCSRF TODO: disable until we fix the issue with the headers
];
export default stackMiddlewares(middlewares);
