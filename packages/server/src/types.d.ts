import { KVNamespace } from "@cloudflare/workers-types";

declare global {
  const TAIL: KVNamespace;
  const CLOUDFLARE: KVNamespace;
  const PUSHER_APP_SECRET: string;
}
