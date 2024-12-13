import { createRoute, z } from "@hono/zod-openapi";

import { selectAccoladesSchema } from "@/db/schema";
import jsonContent from "@/openapi/helpers/json-content";

import * as HttpStatusCodes from "../../http-status-codes";

const tags = ["Accolades"];

export const list = createRoute({
  path: "/accolades",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectAccoladesSchema),
      "The list of accolades",
    ),
  },
});

export type ListRoute = typeof list;
