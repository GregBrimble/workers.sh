import { EmailAddressResolver } from "graphql-scalars";
import gql from "graphql-tag";

export const typeDefs = gql`
  scalar EmailAddress
`;

export const resolvers = {
  EmailAddress: EmailAddressResolver,
};
