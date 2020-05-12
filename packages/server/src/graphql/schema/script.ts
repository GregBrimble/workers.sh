import gql from "graphql-tag";

export const typeDefs = gql`
  type Script {
    id: ID!
    etag: String!
    # size: Int!
    modifiedOn: DateTime!
    script: String!
    tails: [Tail!]!
    tailLogs: [TailLog!]!
    analytics(
      filter: AnalyticsFilterInput!
      limit: Int!
      orderBy: [AnalyticsOrderByInput!]
    ): [Analytics]!
  }
`;
