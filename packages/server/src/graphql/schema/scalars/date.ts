import { GraphQLDate } from "graphql-iso-date";
import gql from "graphql-tag";

export const typeDefs = gql`
  scalar Date
`;

export const resolvers = {
  Date: GraphQLDate,
};
