import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types";

import packageJSON from "../../package.json" with { type: "json"};

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "Hono API Starter",
    },
  });

  app.get(
    "/reference",
    apiReference({
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      theme: "kepler",
      spec: {
        url: "/doc",
      },
    }),
  );
}