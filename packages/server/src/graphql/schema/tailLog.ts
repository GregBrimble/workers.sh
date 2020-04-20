import gql from "graphql-tag";
export { TailLog } from "../../tailLog";

export const typeDefs = gql`
  type TailLog {
    id: ID!
    expiration: DateTime
    value: JSONObject!
  }
`;
