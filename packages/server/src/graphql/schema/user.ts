import gql from "graphql-tag";
import { Context } from "../context";
import { User, UserRepository } from "../../models/User";
import { registerWaitUntil } from "wait-until-all";

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

export const resolvers = {
  Query: {
    user: async (obj, args, context: Context): Promise<User> => {
      const userData = await context.cloudflareREST("user");
      const user = new User(userData, context);
      registerWaitUntil(UserRepository.save(user));
      return user;
    },
  },
};
