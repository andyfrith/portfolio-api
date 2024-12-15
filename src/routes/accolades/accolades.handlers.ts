import { eq } from "drizzle-orm";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { accolade } from "@/db/schema";
import * as HttpStatusCodes from "@/http-status-codes";
import * as HttpStatusPhrases from "@/http-status-phrases";

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from "./accolades.routes";

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const accolade = await db.query.accolade.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });
  if (!accolade) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(accolade, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const accoladeUpdates = c.req.valid("json");
  const [updatedAccolade] = await db.update(accolade)
    .set(accoladeUpdates)
    .where(eq(accolade.id, id))
    .returning();

  if (!updatedAccolade) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }
  return c.json(updatedAccolade, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const result = await db.delete(accolade)
    .where(eq(accolade.id, id));

  if (result.rowCount === 0) {
    return c.json({ message: HttpStatusPhrases.NOT_FOUND }, HttpStatusCodes.NOT_FOUND);
  }
  return c.body(null, HttpStatusCodes.NO_CONTENT);
};

export const list: AppRouteHandler <ListRoute> = async (c) => {
  const accolades = await db.query.accolade.findMany();
  return c.json(accolades);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const accoladeItem = c.req.valid("json");
  const [inserted] = await db.insert(accolade).values(accoladeItem).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};
