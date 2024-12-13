import { createRoute, z } from "@hono/zod-openapi";

import { selectSuperstarSchema } from "@/db/schema";
import jsonContent from "@/openapi/helpers/json-content";

import * as HttpStatusCodes from "../../http-status-codes";

const tags = ["Superstar"];

export const list = createRoute({
  path: "/superstar",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectSuperstarSchema),
      "The superstar",
    ),
  },
});

export type ListRoute = typeof list;
