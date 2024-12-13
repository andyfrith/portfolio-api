import { createRouter } from "@/lib/create-app";

import * as handlers from "./superstar.handlers";
import * as routes from "./superstar.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list);

export default router;
