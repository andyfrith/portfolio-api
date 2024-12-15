import { createRoute, z } from "@hono/zod-openapi";

import { insertAccoladeSchema, patchAccoladeSchema, selectAccoladeSchema } from "@/db/schema";
import { notFoundSchema } from "@/lib/constants";
import jsonContent from "@/openapi/helpers/json-content";
// import jsonContentOneOf from "@/openapi/helpers/json-content-one-of";
import jsonContentRequired from "@/openapi/helpers/json-content-required";
import createErrorSchema from "@/openapi/schemas/create-error-schema";
import IdParamsSchema from "@/openapi/schemas/id-params";

import * as HttpStatusCodes from "../../http-status-codes";

const tags = ["Accolades"];

export const getOne = createRoute({
  path: "/accolades/{id}",
  method: "get",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectAccoladeSchema,
      "The requested accolade",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "The requested accolade was not found",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
  },
});

export const list = createRoute({
  path: "/accolades",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectAccoladeSchema),
      "The list of accolades",
    ),
  },
});

export const patch = createRoute({
  path: "/accolades/{id}",
  method: "patch",
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      patchAccoladeSchema,
      "The accolade updates",
    ),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectAccoladeSchema,
      "The updated accolade",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchAccoladeSchema)
        .or(createErrorSchema(IdParamsSchema)),
      "The validation error(s)",
    ),
    // [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContentOneOf(
    //   [
    //     createErrorSchema(patchAccoladeSchema),
    //     createErrorSchema(IdParamsSchema),
    //   ],
    //   "The validation error(s)",
    // ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Accolade not found",
    ),
  },
});

export const remove = createRoute({
  path: "/accolades/{id}",
  method: "delete",
  request: {
    params: IdParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: "Accolade deleted",
    },
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "Invalid id error",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "Accolade not found",
    ),
  },
});

export const create = createRoute({
  path: "/accolades",
  method: "post",
  request: {
    body: jsonContentRequired(insertAccoladeSchema, "The accolade to create"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectAccoladeSchema,
      "The created accolade",
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertAccoladeSchema),
      "The validation errors",
    ),
  },
});

export type GetOneRoute = typeof getOne;
export type ListRoute = typeof list;
export type CreateRoute = typeof create;
export type PatchRoute = typeof patch;
export type RemoveRoute = typeof remove;
