import gql from "graphql-tag";
import { Context } from "../context";
import { TailLog, getLogs } from "../../tailLog";
import { PUBLIC_URL } from "../../config";

export type Tail = {
  id: string;
  url: string;
  expiresAt: Date;
};

export type SendTailHeartbeatInput = {
  tailID: string;
  scriptID: string;
  accountID?: string;
};

export type CreateTailInput = {
  scriptID: string;
  accountID?: string;
  url?: string;
};

export const typeDefs = gql`
  type Tail {
    id: ID!
    url: URL!
    expiresAt: DateTime!
  }

  input SendTailHeartbeatInput {
    tailID: ID!
    scriptID: ID!
    accountID: ID
  }

  input CreateTailInput {
    scriptID: ID!
    accountID: ID
    url: URL
  }

  extend type Mutation {
    sendTailHeartbeat(input: SendTailHeartbeatInput!): Tail!
    createTail(input: CreateTailInput!): Tail!
  }
`;

export const mapTail = (
  { id, url, expires_at: expiresAt }: any,
  context: Context,
  { accountID, scriptID }: { accountID: string; scriptID: string }
): Tail => ({
  id,
  url,
  expiresAt: expiresAt && new Date(expiresAt),
});

export const resolvers = {
  Mutation: {
    sendTailHeartbeat: async (
      obj,
      {
        input: { tailID, scriptID, accountID },
      }: { input: SendTailHeartbeatInput },
      context: Context
    ): Promise<Tail> => {
      if (!accountID) accountID = (await context.defaultAccount).id;

      const response = await context.cloudflare(
        `accounts/${accountID}/workers/scripts/${scriptID}/tails/${tailID}/heartbeat`,
        {
          method: "POST",
        }
      );
      return mapTail(response, context, { accountID, scriptID });
    },
    createTail: async (
      obj,
      { input: { accountID, scriptID, url } }: { input: CreateTailInput },
      context: Context
    ): Promise<Tail> => {
      accountID = accountID || (await context.defaultAccount).id;
      url = url || `${PUBLIC_URL}tailLog/${accountID}/${scriptID}`;

      const response = await context.cloudflare(
        `accounts/${accountID}/workers/scripts/${scriptID}/tails`,
        {
          method: "POST",
          body: JSON.stringify({ url }),
        }
      );
      return mapTail(response, context, { accountID, scriptID });
    },
  },
};
