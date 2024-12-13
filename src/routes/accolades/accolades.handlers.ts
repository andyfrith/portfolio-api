import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";

import type { ListRoute } from "./accolades.routes";

export const list: AppRouteHandler <ListRoute> = async (c) => {
  const accolades = await db.query.accolade.findMany();
  return c.json(accolades);
  // return c.json([{
  //   name: "An accolade",
  //   done: false,
  // }]);
};
