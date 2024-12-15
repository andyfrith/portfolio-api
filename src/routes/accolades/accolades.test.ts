import { testClient } from "hono/testing";
import { describe, expect, expectTypeOf, it } from "vitest";
import { ZodIssueCode } from "zod";

import env from "@/env";
import * as HttpStatusPhrases from "@/http-status-phrases";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/lib/constants";
import createApp, { createTestApp } from "@/lib/create-app";

import router from "./accolades.index";

if (env.NODE_ENV !== "test") {
  throw new Error("NODE_ENV must be 'test'");
}

// @ts-expect-error - description goes here
const client = testClient(createApp().route("/", router));

describe("accolades routes", () => {
  it("get /accolades lists all accolades", async () => {
    const response = await client.accolades.$get();
    const json = await response.json();
    // @ts-expect-error - description goes here
    expectTypeOf(json).toBeArray();
  });

  it("post /accolades validates the body when creating", async () => {
    const response = await client.accolades.$post({
      json: {},
    });
    expect(response.status).toBe(422);
    if (response.status === 422) {
      const json = await response.json();
      expect(json.error.issues[0].path[0]).toBe("summary");
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.REQUIRED);
    }
  });

  const id = 42;
  const summary = "I have superstar powers";
  const superstarId = 1;

  it.skip("post /accolades creates an accolade", async () => {
    const response = await client.accolades.$post({
      json: {
        summary,
        superstarId,
      },
    });
    expect(response.status).toBe(200);
    if (response.status === 200) {
      const json = await response.json();
      expect(json.summary).toBe(summary);
      expect(json.superstarId).toBe(superstarId);
    }
  });

  it("get /accolades/{id} validates the id param", async () => {
    const response = await client.accolades[":id"].$get({
      param: {
        id: "wat",
      },
    });
    expect(response.status).toBe(422);
  });

  it("get /accolades/{id} returns 404 when accolade not found", async () => {
    const response = await client.accolades[":id"].$get({
      param: {
        id: 999,
      },
    });
    expect(response.status).toBe(404);
    if (response.status === 404) {
      const json = await response.json();
      expect(json.message).toBe(HttpStatusPhrases.NOT_FOUND);
    }
  });

  it("get /accolades/{id} gets a single accolade", async () => {
    const response = await client.accolades[":id"].$get({
      param: {
        id,
      },
    });
    expect(response.status).toBe(200);
    if (response.status === 200) {
      const json = await response.json();
      expect(json.summary).toBe(summary);
    }
  });

  it("patch /accolades/{id} validates the body when updating", async () => {
    const response = await client.accolades[":id"].$patch({
      param: {
        id,
      },
      json: {
        summary: "",
      },
    });
    expect(response.status).toBe(422);
    if (response.status === 422) {
      const json = await response.json();
      expect(json.error.issues[0].path[0]).toBe("summary");
      expect(json.error.issues[0].code).toBe(ZodIssueCode.too_small);
    }
  });

  it("patch /accolades/{id} validates the id param", async () => {
    const response = await client.accolades[":id"].$patch({
      param: {
        id: "wat",
      },
      json: {},
    });
    expect(response.status).toBe(422);
    if (response.status === 422) {
      const json = await response.json();
      expect(json.error.issues[0].path[0]).toBe("id");
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.EXPECTED_NUMBER);
    }
  });

  it.skip("patch /accolades/{id} validates empty body", async () => {
    const response = await client.accolades[":id"].$patch({
      param: {
        id,
      },
      json: {},
    });
    expect(response.status).toBe(422);
    if (response.status === 422) {
      const json = await response.json();
      expect(json.error.issues[0].code).toBe(ZOD_ERROR_CODES.INVALID_UPDATES);
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.NO_UPDATES);
    }
  });

  it("patch /accolades/{id} updates a single property of a accolade", async () => {
    const response = await client.accolades[":id"].$patch({
      param: {
        id,
      },
      json: {
        summary,
      },
    });
    expect(response.status).toBe(200);
    if (response.status === 200) {
      const json = await response.json();
      expect(json.summary).toBe(summary);
    }
  });

  it("delete /accolades/{id} validates the id when deleting", async () => {
    const response = await client.accolades[":id"].$delete({
      param: {
        id: "wat",
      },
    });
    expect(response.status).toBe(422);
    if (response.status === 422) {
      const json = await response.json();
      expect(json.error.issues[0].path[0]).toBe("id");
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.EXPECTED_NUMBER);
    }
  });

  it.skip("delete /accolades/{id} removes a accolade", async () => {
    const response = await client.accolades[":id"].$delete({
      param: {
        id,
      },
    });
    expect(response.status).toBe(204);
  });
});
