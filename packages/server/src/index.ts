import {} from "@cloudflare/workers-types";
import { Router } from "./lib/router";
import { handleRequest as graphql } from "./graphql";
import { handleRequest as tailLogHandler } from "./tailLog";
import { handleRequest as auth } from "./pusher/auth";
export { executeWaitUntil } from "wait-until-all";

const router = new Router();
router.get("/graphql", graphql);
router.post("/graphql", graphql);
router.post("/pusher/auth", auth);
router.post("/incoming/tailLog/.*", tailLogHandler);

export const handleRequest = async (request: Request): Promise<Response> =>
  router.route(request);
