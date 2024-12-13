import { createRouter } from "@/lib/create-app";

import * as handlers from "./accolades.handlers";
import * as routes from "./accolades.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list);

export default router;
