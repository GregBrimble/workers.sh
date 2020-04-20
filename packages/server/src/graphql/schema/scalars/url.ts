import { URLResolver } from "graphql-scalars";
import gql from "graphql-tag";

export const typeDefs = gql`
  scalar URL
`;

export const resolvers = {
  URL: URLResolver,
};
