import { KVNamespace } from "@cloudflare/workers-types";

declare global {
  const TAIL_LOGS: KVNamespace;
}
