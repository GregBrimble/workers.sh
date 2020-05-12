import gql from "graphql-tag";
import { Context } from "../context";

export type Token = {
  id: string;
  status: string;
  notBefore?: Date;
  expiresOn?: Date;
};

export const typeDefs = gql`
  type Token {
    id: ID!
    status: String!
    notBefore: DateTime
    expiresOn: DateTime
  }

  extend type Query {
    token: Token!
  }
`;

const mapToken = (
  { id, status, not_before: notBefore, expires_on: expiresOn },
  context: Context
): Token => ({
  id,
  status,
  notBefore: notBefore && new Date(notBefore),
  expiresOn: expiresOn && new Date(expiresOn),
});

export const resolvers = {
  Query: {
    token: async (obj, args, context: Context): Promise<Token> => {
      return mapToken(
        await context.cloudflareREST("user/tokens/verify"),
        context
      );
    },
  },
};
