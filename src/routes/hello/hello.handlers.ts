import type { AppRouteHandler } from "@/lib/types";

import type { ListRoute } from "./hello.routes";

export const list: AppRouteHandler <ListRoute> = (c) => {
  return c.json([{
    name: "Hi there!",
    done: false,
  }]);
};
