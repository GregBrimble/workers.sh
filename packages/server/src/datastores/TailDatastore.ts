import { CloudflareWorkersKVDatastore } from "@kv-orm/cf-workers";

export const TailDatastore = new CloudflareWorkersKVDatastore(TAIL, {
  optionsGenerator: () => ({
    expirationTtl: 120,
  }),
});
