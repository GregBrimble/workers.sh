import gql from "graphql-tag";
import { Context } from "../context";
import { PUBLIC_URL } from "../../config";
import { Tail, TailRepository } from "../../models/Tail";
import { AccountRepository } from "../../models/Account";
import { registerWaitUntil } from "wait-until-all";

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
    accountID: ID!
    scriptID: ID!
    tailID: ID!
  }

  input CreateTailInput {
    accountID: ID!
    scriptID: ID!
    url: URL
  }

  extend type Mutation {
    sendTailHeartbeat(input: SendTailHeartbeatInput!): Tail!
    createTail(input: CreateTailInput!): Tail!
  }
`;

export const resolvers = {
  Mutation: {
    sendTailHeartbeat: async (
      obj,
      {
        input: { accountID, scriptID, tailID },
      }: { input: SendTailHeartbeatInput },
      context: Context
    ): Promise<Tail> => {
      const tailData = await context.cloudflareREST(
        `accounts/${accountID}/workers/scripts/${scriptID}/tails/${tailID}/heartbeat`,
        {
          method: "POST",
        }
      );

      const account = await AccountRepository.load(accountID);
      const script = await account.script({ id: scriptID });
      const tail = new Tail(tailData, context, { script });
      registerWaitUntil(TailRepository.save(tail));
      return tail;
    },
    createTail: async (
      obj,
      { input: { accountID, scriptID, url } }: { input: CreateTailInput },
      context: Context
    ): Promise<Tail> => {
      url = url || `${PUBLIC_URL}tailLog/${accountID}/${scriptID}`;

      const tailData = await context.cloudflareREST(
        `accounts/${accountID}/workers/scripts/${scriptID}/tails`,
        {
          method: "POST",
          body: JSON.stringify({ url }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const account = await AccountRepository.load(accountID);
      console.log("Got Account", account);
      const script = await account.script({ id: scriptID });
      const tail = new Tail(tailData, context, { script });
      registerWaitUntil(TailRepository.save(tail));
      return tail;
    },
  },
};
