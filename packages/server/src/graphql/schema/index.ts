import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";
import { Context } from "../context";
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from "./scalars";
import { typeDefs as userTypeDefs, resolvers as userResolvers } from "./user";
import {
  typeDefs as tokenTypeDefs,
  resolvers as tokenResolvers,
} from "./token";
import {
  typeDefs as accountTypeDefs,
  resolvers as accountResolvers,
} from "./account";
import { typeDefs as scriptTypeDefs } from "./script";
import { typeDefs as tailTypeDefs, resolvers as tailResolvers } from "./tail";
import { typeDefs as tailLogTypeDefs } from "./tailLog";
import { typeDefs as analyticsTypeDefs } from "./analytics";
import {
  typeDefs as dataCenterTypeDefs,
  resolvers as dataCenterResolvers,
} from "./dataCenter";

const typeDefs = gql`
  type Query {
    hello: String
  }
  type Mutation {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: (obj, args, {}: Context): string => {
      return `Hello, world!`;
    },
  },
  Mutation: {
    hello: (obj, args, {}: Context): string => {
      return `Hello, world!!`;
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    ...scalarTypeDefs,

    userTypeDefs,
    tokenTypeDefs,
    accountTypeDefs,
    scriptTypeDefs,
    tailTypeDefs,
    tailLogTypeDefs,
    analyticsTypeDefs,
    dataCenterTypeDefs,
  ],
  resolvers: [
    resolvers,
    ...scalarResolvers,

    userResolvers,
    tokenResolvers,
    accountResolvers,
    tailResolvers,
    dataCenterResolvers,
  ],
});
