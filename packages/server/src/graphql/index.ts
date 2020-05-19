import { graphql, Source } from "graphql";
import { makeContextValue } from "./context";
import { schema } from "./schema";

type GraphQLRequest = {
  source?: Source | string;
  rootValue?: any;
  contextValue?: any;
  variableValues?: { [key: string]: any };
  operationName?: string;
};

const handleError = async (request: Request, error: Error) => {
  // TODO: Pass to Sentry or similar
};

const makeGraphQLRequestFromGet = async (request: Request) => {
  const graphQLRequest: GraphQLRequest = {};

  const url = new URL(request.url);
  graphQLRequest.source = url.searchParams.get(`query`) || undefined;
  graphQLRequest.variableValues = JSON.parse(
    url.searchParams.get(`variables`) || `null`
  );
  graphQLRequest.operationName =
    url.searchParams.get(`operationName`) || undefined;
  graphQLRequest.contextValue = await makeContextValue(request);

  return graphQLRequest;
};

const makeGraphQLRequestFromPost = async (request: Request) => {
  const graphQLRequest: GraphQLRequest = {};

  const { query, variables, operationName } = await request.json();
  graphQLRequest.source = query;
  graphQLRequest.variableValues = variables;
  graphQLRequest.operationName = operationName;
  graphQLRequest.contextValue = await makeContextValue(request);

  return graphQLRequest;
};

const makeResponse = (data: any) => {
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": `application/json` },
  });
};

export const handleRequest = async (request: Request): Promise<Response> => {
  let graphQLRequest: GraphQLRequest;

  try {
    switch (request.method.toLowerCase()) {
      case `get`:
        graphQLRequest = await makeGraphQLRequestFromGet(request);
        break;
      case `post`:
        graphQLRequest = await makeGraphQLRequestFromPost(request);
        break;

      default:
        return new Response(``, { status: 405 });
    }
  } catch (error) {
    return makeResponse({
      errors: [{ message: `Syntax Error: Could not parse request` }],
    });
  }

  try {
    const result = await graphql(
      schema,
      graphQLRequest.source || ``,
      graphQLRequest.rootValue,
      graphQLRequest.contextValue,
      graphQLRequest.variableValues,
      graphQLRequest.operationName
    );
    // TODO: Call `handleError` when appropriate
    return makeResponse(result);
  } catch (error) {
    await handleError(request, error);
    return makeResponse({ errors: [{ message: `Internal Server Error` }] });
  }
};
