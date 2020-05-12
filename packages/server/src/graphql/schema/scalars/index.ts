import { typeDefs as dateTypeDefs, resolvers as dateResolvers } from "./date";
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
  dateTypeDefs,
  dateTimeTypeDefs,
  emailAddressTypeDefs,
  jsonObjectTypeDefs,
  urlTypeDefs,
];
export const resolvers = [
  dateResolvers,
  dateTimeResolvers,
  emailAddressResolvers,
  jsonObjectResolvers,
  urlResolvers,
];
