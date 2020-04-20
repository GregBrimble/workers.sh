import { makeCloudflareClient } from "./cloudflare";
import { Account, getDefaultAccount } from "./schema/account";

export type Context = {
  cloudflare: (
    path: string,
    init?: RequestInit,
    { complete }?: { complete: boolean }
  ) => Promise<any>;
  defaultAccount: Promise<Account>;
};

export const makeContextValue = async (request: Request): Promise<Context> => {
  let defaultAccount = undefined;

  return {
    cloudflare: makeCloudflareClient(request.headers.get("Authorization")),
    get defaultAccount() {
      if (defaultAccount === undefined)
        defaultAccount = getDefaultAccount(this);
      return defaultAccount;
      // return (defaultAccount = defaultAccount || getDefaultAccount(this));
    },
  };
};
