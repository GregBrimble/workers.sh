import {} from "@cloudflare/workers-types";
import { Router } from "./lib/router";
import { api as graphql } from "./graphql";
import { handleRequest as tailLogHandler } from "./tailLog";

const router = new Router();
router.get("/graphql", graphql);
router.post("/graphql", graphql);
router.post("/tailLog/.*", tailLogHandler);

export const handleRequest = async (request: Request): Promise<Response> =>
  router.route(request);
