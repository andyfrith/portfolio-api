import { createRouter } from "@/lib/create-app";

import * as handlers from "./hello.handlers";
import * as routes from "./hello.routes";

const router = createRouter()
  .openapi(routes.list, handlers.list);

export default router;
