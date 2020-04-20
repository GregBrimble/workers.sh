import {
  typeDefs as dateTimeTypeDefs,
  resolvers as dateTimeResolvers,
} from "./dateTime";
import {
  typeDefs as emailAddressTypeDefs,
  resolvers as emailAddressResolvers,
} from "./emailAddress";
import {
  typeDefs as jsonObjectTypeDefs,
  resolvers as jsonObjectResolvers,
} from "./jsonObject";
import { typeDefs as urlTypeDefs, resolvers as urlResolvers } from "./url";

export const typeDefs = [
  dateTimeTypeDefs,
  emailAddressTypeDefs,
  jsonObjectTypeDefs,
  urlTypeDefs,
];
export const resolvers = [
  dateTimeResolvers,
  emailAddressResolvers,
  jsonObjectResolvers,
  urlResolvers,
];
