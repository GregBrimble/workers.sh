import gql from "graphql-tag";
import { Tail, mapTail } from "./tail";
import { resolvers as accountResolvers, Account } from "./account";
import { Context } from "../context";
import { getLogs, TailLog } from "../../tailLog";

export type Script = {
  id: string;
  etag: string;
  createdOn: Date;
  modifiedOn: Date;
  script: Promise<string>;
  tails: Promise<Tail[]>;
  tailLogs: Promise<TailLog[]>;
};

type ScriptArguments = {
  scriptID: string;
  accountID?: string;
};

export const typeDefs = gql`
  type Script {
    id: ID!
    etag: String!
    createdOn: DateTime!
    modifiedOn: DateTime!
    script: String!
    tails: [Tail!]!
    tailLogs: [TailLog!]!
  }

  extend type Query {
    script(scriptID: ID!, accountID: ID): Script!
  }
`;

export const mapScript = (
  { id, etag, created_on: createdOn, modified_on: modifiedOn }: any,
  context: Context,
  { accountID }: { accountID: string }
): Script => ({
  id,
  etag,
  createdOn: createdOn && new Date(createdOn),
  modifiedOn: modifiedOn && new Date(modifiedOn),
  get script() {
    return (async () => {
      const response = await context.cloudflare(
        `accounts/${accountID}/workers/scripts/${id}`,
        undefined,
        { complete: true }
      );
      return response.text();
    })();
  },
  get tails() {
    return (async () => {
      const tails = await context.cloudflare(
        `accounts/${accountID}/workers/scripts/${id}/tails`
      );
      return tails.map((tail) =>
        mapTail(tail, context, { accountID, scriptID: id })
      );
    })();
  },
  get tailLogs() {
    return (async () => {
      return await getLogs(accountID, id);
    })();
  },
});

export const resolvers = {
  Query: {
    script: async (
      obj,
      { scriptID, accountID }: ScriptArguments,
      context: Context
    ): Promise<Script> => {
      let account = accountID
        ? await accountResolvers.Query.account(
            undefined,
            { id: accountID },
            context
          )
        : await context.defaultAccount;

      return (await account.scripts).find((script) => script.id === scriptID);
    },
  },
};
