import hello from "@/routes/hello/hello.index";
import index from "@/routes/index.route";

import configureOpenAPI from "./lib/configure-open-api";
import createApp from "./lib/create-app";
import notFound from "./middlewares/not-found";
import onError from "./middlewares/on-error";

const app = createApp();
const routes = [index, hello];
configureOpenAPI(app);
routes.forEach((route) => {
  app.route("/", route);
});

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
