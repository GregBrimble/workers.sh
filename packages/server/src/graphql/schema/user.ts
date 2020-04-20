import gql from "graphql-tag";
import { Context } from "../context";

export type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  // username, telephone, country, zipcode
  createdOn: Date;
  modifiedOn: Date;
  // twoFactorAuthenticationEnabled, suspended
};

export const typeDefs = gql`
  type User {
    id: ID!
    email: EmailAddress!
    firstName: String
    lastName: String
    createdOn: DateTime!
    modifiedOn: DateTime!
  }

  extend type Query {
    user: User
  }
`;

const mapUser = (
  {
    id,
    email,
    first_name: firstName,
    last_name: lastName,
    created_on: createdOn,
    modified_on: modifiedOn,
  },
  context: Context
): User => ({
  id,
  email,
  firstName,
  lastName,
  createdOn: createdOn && new Date(createdOn),
  modifiedOn: modifiedOn && new Date(modifiedOn),
});

export const resolvers = {
  Query: {
    user: async (obj, args, context: Context): Promise<User> => {
      return mapUser(await context.cloudflare("user"), context);
    },
  },
};
