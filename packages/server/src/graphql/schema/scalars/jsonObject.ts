import { JSONObjectResolver } from "graphql-scalars";
import gql from "graphql-tag";

export const typeDefs = gql`
  scalar JSONObject
`;

export const resolvers = {
  JSONObject: JSONObjectResolver,
};
