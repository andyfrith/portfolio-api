import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";

import type { ListRoute } from "./superstar.routes";

export const list: AppRouteHandler <ListRoute> = async (c) => {
  const superstar = await db.query.superstar.findMany();
  return c.json(superstar);
};
