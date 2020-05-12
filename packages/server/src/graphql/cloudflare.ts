import { DocumentNode } from "graphql";
import { print } from "graphql";

const REST_URL = `https://api.cloudflare.com/client/v4/`;
const GRAPHQL_URL = `https://api.cloudflare.com/client/v4/graphql`;

export const makeRESTlient = (request: Request) => async (
  path: string,
  init: RequestInit = {},
  { complete }: { complete: boolean } = { complete: false }
) => {
  const url = `${REST_URL}${path}`;

  const headers = new Headers(init.headers || {});
  headers.set("Authorization", request.headers.get("Authorization"));
  init.headers = headers;

  const resp = await fetch(url, init);
  if (complete) return resp;
  const data = await resp.json();
  if ((data.errors || []).length !== 0)
    throw new Error(JSON.stringify(data.errors));
  return data.result;
};

export type GraphQLOptions = {
  variables?: any;
  operationName?: string;
};

export const makeGraphQLClient = (request: Request) => async (
  query: DocumentNode,
  { variables, operationName }: GraphQLOptions = {}
) => {
  const headers = new Headers({
    "X-AUTH-EMAIL": request.headers.get("X-AUTH-EMAIL"),
    "X-AUTH-KEY": request.headers.get("X-AUTH-KEY"),
    "Content-Type": "application/json",
  });

  const resp = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: print(query),
      operationName,
      variables,
    }),
  });
  const data = await resp.json();
  if ((data.errors || []).length !== 0)
    throw new Error(JSON.stringify(data.errors));
  return data.data;
};
