import { makeRESTlient, makeGraphQLClient, GraphQLOptions } from "./cloudflare";
import { DocumentNode } from "graphql";

export type Context = {
  cloudflareREST: (
    path: string,
    init?: RequestInit,
    { complete }?: { complete: boolean }
  ) => Promise<any>;
  cloudflareGraphQL: (
    query: DocumentNode,
    options?: GraphQLOptions
  ) => Promise<any>;
};

export const makeContextValue = async (request: Request): Promise<Context> => ({
  cloudflareREST: makeRESTlient(request),
  cloudflareGraphQL: makeGraphQLClient(request),
});
