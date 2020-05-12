import { CloudflareWorkersKVDatastore } from "@kv-orm/cf-workers";

export const CloudflareDatastore = new CloudflareWorkersKVDatastore(
  CLOUDFLARE,
  {
    // optionsGenerator: (key, value) => {
    //   return {
    //     expirationTtl: 120,
    //   };
    // },
  }
);
