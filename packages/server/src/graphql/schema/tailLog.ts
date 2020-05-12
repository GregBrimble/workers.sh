import gql from "graphql-tag";

export const typeDefs = gql`
  type TailLogException {
    name: String!
    message: String
    timestamp: DateTime!
  }

  type TailLogLog {
    message: String
    level: String!
    timestamp: DateTime!
  }

  type TailLog {
    id: ID!
    outcome: String!
    exceptions: [TailLogException!]!
    logs: [TailLogLog!]!
    timestamp: DateTime!
    url: URL!
    method: String!
    headers: JSONObject!
    cf: JSONObject!
  }
`;
