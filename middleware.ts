import { stackMiddlewares } from "./middlewares/stack";
import { withCSRF } from "./middlewares/csrf";
import { withBasicAuthorization } from "./middlewares/basic-auth";

const middlewares = [withBasicAuthorization, withCSRF];
export default stackMiddlewares(middlewares);
