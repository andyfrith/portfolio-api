import { createRoute, z } from "@hono/zod-openapi";

import jsonContent from "@/openapi/helpers/json-content";

import * as HttpStatusCodes from "../../http-status-codes";

const tags = ["Hello"];

export const list = createRoute({
  path: "/hello",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(z.object({
        name: z.string(),
        done: z.boolean(),
      })),
      "The list of hellos",
    ),
  },
});

export type ListRoute = typeof list;
