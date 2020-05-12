import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  concat,
  InMemoryCache,
} from "@apollo/client";
import { getSettings } from "./contexts/SettingsContext";

const httpLink = new HttpLink({ uri: "/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  const { token, emailAddress, key } = getSettings();
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "X-AUTH-EMAIL": emailAddress,
      "X-AUTH-KEY": key,
    },
  });

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
