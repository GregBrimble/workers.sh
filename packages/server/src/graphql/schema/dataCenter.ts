import gql from "graphql-tag";
import { Context } from "../context";
import { Account, AccountRepository } from "../../models/Account";
import { registerWaitUntil } from "wait-until-all";
import { dataCenters } from "../../lib/dataCenters";

type DataCenter = {
  id: string;
  name: string;
  group: string;
  latitude: number;
};

export type DataCenterArguments = {
  id: string;
};

export const typeDefs = gql`
  type DataCenter {
    id: ID!
    name: String!
    group: String!
    latitude: Float!
    longitude: Float!
  }

  extend type Query {
    dataCenters: [DataCenter!]!
    dataCenter(id: ID!): DataCenter!
  }
`;

export const resolvers = {
  Query: {
    dataCenters: (): DataCenter[] => dataCenters,
    dataCenter: (obj, { id: searchedID }: DataCenterArguments): DataCenter =>
      dataCenters.find(({ id }) => id === searchedID),
  },
};
