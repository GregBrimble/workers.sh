import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { MagicTable } from "../MagicTable";
import { BigStatus } from "../BigStatus";

const PEEK_POLL_INTERVAL = 5000;

const PEEK_QUERY = gql`
  query($accountID: ID!, $scriptID: ID!) {
    account(id: $accountID) {
      script(id: $scriptID) {
        tails {
          id
          url
          expiresAt
        }
        tailLogs {
          id
          outcome
          exceptions {
            name
            message
            timestamp
          }
          logs {
            message
            level
            timestamp
          }
          timestamp
          url
          method
          headers
          cf
        }
      }
    }
  }
`;

// const SEND_TAIL_HEARTBEAT_MUTATION = gql`
//   mutation($accountID: ID!, $scriptID: ID!, $tailID: ID!) {
//     sendTailHeartbeat(
//       input: { accountID: $accountID, scriptID: $scriptID, tailID: $tailID }
//     ) {
//       id
//       url
//       expiresAt
//     }
//   }
// `;

const CREATE_TAIL_MUTATION = gql`
  mutation($accountID: ID!, $scriptID: ID!) {
    createTail(input: { accountID: $accountID, scriptID: $scriptID }) {
      id
      url
      expiresAt
    }
  }
`;

// export const Peek = () => {
//   const { workerID: scriptID, accountID } = useParams();

//   const { loading, error, data } = useQuery(PEEK_QUERY, {
//     variables: { accountID, scriptID },
//     pollInterval: PEEK_POLL_INTERVAL,
//   });

//   const [createTail, { loading: createTailLoading }] = useMutation(
//     CREATE_TAIL_MUTATION,
//     {
//       update: (cache, { data: { createTail } }) => {
//         const newScript = JSON.parse(JSON.stringify(data.account.script));
//         newScript.tails.push(createTail);

//         cache.writeQuery({
//           query: PEEK_QUERY,
//           variables: { accountID, scriptID },
//           data: { script: newScript },
//         });
//       },
//       onError: (error) => {
//         if (JSON.parse(error.graphQLErrors[0]?.message)[0].code !== 10046)
//           throw error;
//       },
//     }
//   );

//   if (loading || createTailLoading)
//     return (
//       <BigStatus
//         icon={<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
//         text="Loading..."
//       />
//     );
//   if (error && !data)
//     return (
//       <BigStatus
//         icon={<path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
//         text="Error loading worker"
//       />
//     );

//   if (data.account.script.tails.length === 0) {
//     createTail({ variables: { accountID, scriptID } });
//     return (
//       <BigStatus
//         icon={<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
//         text="Creating tail..."
//       />
//     );
//   }

//   if (data.account.script.tailLogs.length === 0)
//     return (
//       <BigStatus
//         icon={<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
//         text="Listening for requests..."
//       />
//     );

//   return <span>{JSON.stringify(data.account.script.tailLogs)}</span>;
//   // <MagicTable
//   //   data={data.account.script.tailLogs.map((tailLog: any) => tailLog.value)}
//   //   header={(accessor) => (accessor === "__typename" ? "Boo" : accessor)}
//   // />
// };

export const Peek = () => {
  return (
    <BigStatus
      icon={<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
      text="Coming soon!"
    />
  );
};
