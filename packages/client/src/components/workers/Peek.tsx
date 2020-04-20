import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";

const PEEK_QUERY = gql`
  query($scriptID: ID!) {
    script(scriptID: $scriptID) {
      tails {
        id
        url
        expiresAt
      }
      tailLogs {
        id
        expiration
        value
      }
    }
  }
`;

const CREATE_TAIL_MUTATION = gql`
  mutation($scriptID: ID!) {
    createTail(input: { scriptID: $scriptID }) {
      id
      url
      expiresAt
    }
  }
`;

export const Peek = () => {
  const { workerID: scriptID } = useParams();
  const { loading, error, data } = useQuery(PEEK_QUERY, {
    variables: { scriptID },
  });
  const [
    createTail,
    { called: createTailCalled, loading: createTailLoading },
  ] = useMutation(CREATE_TAIL_MUTATION, {
    update: (cache, { data: { createTail } }) => {
      const { script } = cache.readQuery({
        query: PEEK_QUERY,
        variables: { scriptID },
      }) as { script: any };

      const newScript = JSON.parse(JSON.stringify(script));
      newScript.tails.push(createTail);

      cache.writeQuery({
        query: PEEK_QUERY,
        variables: { scriptID },
        data: { script: newScript },
      });
    },
    onError: (error) => {
      if (JSON.parse(error.graphQLErrors[0]?.message)[0].code === 10046) return;

      throw error;
    },
  });

  if (loading || createTailLoading) return "Loading...";
  if (error) return "Error loading worker.";

  if (data.script.tails.length === 0 && !createTailCalled) {
    console.log("Creating tail...");
    createTail({ variables: { scriptID } });
    return "Creating tail...";
  }

  return <div>{JSON.stringify(data.script)}</div>;
};
