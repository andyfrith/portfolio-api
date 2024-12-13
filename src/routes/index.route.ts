import { createRoute } from "@hono/zod-openapi";

import { createRouter } from "@/lib/create-app";
import jsonContent from "@/openapi/helpers/json-content";
import createMessageObjectSchema from "@/openapi/schemas/create-message-object";

import * as HttpStatusCodes from "../http-status-codes";

const router = createRouter()
  .openapi(
    createRoute({
      tags: ["Index"],
      method: "get",
      path: "/",
      responses: {
        [HttpStatusCodes.OK]: jsonContent(
          createMessageObjectSchema("Hono API Starter"),
          "Hono API Starter Index",
        ),
      },
    }),
    (c) => {
      return c.json({
        message: "Hono API Starter",
      }, HttpStatusCodes.OK);
    },
  );

export default router;
