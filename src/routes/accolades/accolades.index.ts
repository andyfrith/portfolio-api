import { createRouter } from "@/lib/create-app";

import * as handlers from "./accolades.handlers";
import * as routes from "./accolades.routes";

const router = createRouter()
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.remove, handlers.remove)
  .openapi(routes.patch, handlers.patch);

export default router;
