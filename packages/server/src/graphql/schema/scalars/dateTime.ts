import { DateTimeResolver } from "graphql-scalars";
import gql from "graphql-tag";

export const typeDefs = gql`
  scalar DateTime
`;

export const resolvers = {
  DateTime: DateTimeResolver,
};
