import gql from "graphql-tag";
import { Context } from "../context";
import { Account, AccountRepository } from "../../models/Account";
import { registerWaitUntil } from "wait-until-all";

export type AccountArguments = {
  id: string;
};

export type ScriptArguments = {
  id: string;
};

export const typeDefs = gql`
  type Account {
    id: ID!
    name: String!
    createdOn: DateTime!
    subdomain: String
    scripts: [Script!]!
    script(id: ID!): Script!
  }

  extend type Query {
    accounts: [Account!]!
    account(id: ID!): Account!
  }
`;

export const resolvers = {
  Query: {
    accounts: async (obj, args, context: Context): Promise<Account[]> => {
      const accountsData = await context.cloudflareREST("accounts");
      const accounts: Account[] = [];
      for (const accountData of accountsData) {
        const account = new Account(accountData, context);
        registerWaitUntil(AccountRepository.save(account));
        accounts.push(account);
      }
      return accounts;
    },
    account: async (
      obj,
      { id }: AccountArguments,
      context: Context
    ): Promise<Account> => {
      const accountData = await context.cloudflareREST(`accounts/${id}`);
      const account = new Account(accountData, context);
      registerWaitUntil(AccountRepository.save(account));
      return account;
    },
  },
};
