import gql from "graphql-tag";
import { Context } from "../context";
import { Script, mapScript } from "./script";

export type Account = {
  id: string;
  name: string;
  // settings
  createdOn: Date;
  subdomain?: Promise<string>;
  scripts: Promise<Script[]>;
};

export type AccountArguments = {
  id?: string;
};

export const typeDefs = gql`
  type Account {
    id: ID!
    name: String!
    createdOn: DateTime!
    subdomain: String
    scripts: [Script!]!
  }

  extend type Query {
    accounts: [Account!]!
    account(id: String): Account!
  }
`;

const mapAccount = (
  { id, name, created_on: createdOn }: any,
  context: Context
): Account => ({
  id,
  name,
  createdOn: createdOn && new Date(createdOn),
  get subdomain() {
    return (async () => {
      const { subdomain } = await context.cloudflare(
        `accounts/${id}/workers/subdomain`
      );
      return subdomain;
    })();
  },
  get scripts() {
    return (async () => {
      const scripts = await context.cloudflare(
        `accounts/${id}/workers/scripts`
      );
      return scripts.map((script) =>
        mapScript(script, context, { accountID: id })
      );
    })();
  },
});

export const resolvers = {
  Query: {
    accounts: async (obj, args, context: Context): Promise<Account> => {
      const accounts = await context.cloudflare("accounts");
      return accounts.map((account) => mapAccount(account, context));
    },
    account: async (
      obj,
      { id }: AccountArguments,
      context: Context
    ): Promise<Account> => {
      if (!id) return context.defaultAccount;

      return mapAccount(await context.cloudflare(`accounts/${id}`), context);
    },
  },
};

export const getDefaultAccount = async (context: Context): Promise<Account> =>
  (await resolvers.Query.accounts(undefined, undefined, context))[0];
