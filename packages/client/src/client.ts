import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  concat,
  InMemoryCache,
} from "@apollo/client";
import { useSettings, getSettings } from "./contexts/SettingsContext";

const httpLink = new HttpLink({ uri: "/graphql" });

const authMiddleware = new ApolloLink((operation, forward) => {
  const { token } = getSettings();
  operation.setContext({
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  return forward(operation);
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});
