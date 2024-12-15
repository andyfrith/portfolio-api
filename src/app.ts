import accolades from "@/routes/accolades/accolades.index";
import hello from "@/routes/hello/hello.index";
import index from "@/routes/index.route";
import superstar from "@/routes/superstar/superstar.index";

import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import notFound from "./middlewares/not-found";
import onError from "./middlewares/on-error";

const app = createApp();
const routes = [index, accolades, hello, superstar] as const;
configureOpenAPI(app);
routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/error", (c) => {
  c.status(422);
  c.var.logger.info("oh no");
  throw new Error("Oh no!");
});

app.notFound(notFound);
app.onError(onError);

export default app;
