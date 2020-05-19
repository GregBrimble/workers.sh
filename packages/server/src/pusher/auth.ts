import gql from "graphql-tag";
import { handleRequest as graphql } from "../graphql/index";
import { getUtf8Bytes } from "../utils/getUtf8Bytes";
import { APP_KEY } from ".";
import { arrayBufferToHexString } from "../utils/arrayBufferToHexString";

const WORKERS_SH_PEEK_REGEX = /^private-WORKERS\.SH_peek-(?<accountID>[^-]+)-(?<scriptID>.+)$/;

const keyBytes = getUtf8Bytes(PUSHER_APP_SECRET);
const cryptoKeyPromise = crypto.subtle.importKey(
  "raw",
  keyBytes,
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign"]
);

export const sign = async (message: string) => {
  const sig = await crypto.subtle.sign(
    "HMAC",
    await cryptoKeyPromise,
    getUtf8Bytes(message)
  );
  return arrayBufferToHexString(sig);
};

const authenticate = async (socketID: string, channelName: string) => {
  const message = [socketID, channelName].join(":");
  return { auth: [APP_KEY, await sign(message)].join(":") };
};

export const handleRequest = async (request: Request) => {
  const data = await request.formData();
  const socketID = data.get("socket_id").toString();
  const channelName = data.get("channel_name").toString();

  const isWorkersShPeek = channelName.match(WORKERS_SH_PEEK_REGEX);
  if (isWorkersShPeek) {
    const { accountID, scriptID } = isWorkersShPeek.groups;

    const response = await graphql(
      new Request("", {
        method: "POST",
        body: JSON.stringify({
          query: `
            query($accountID: ID!, $scriptID: ID!) {
              account(id: $accountID) {
                script(id: $scriptID) {
                  id
                }
              }
            }
          `,
          variables: {
            accountID,
            scriptID,
          },
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: request.headers.get("Authorization"),
        },
      })
    );
    const { data, errors } = await response.json();

    if ((errors || []).length === 0 && data.account.script.id === scriptID)
      return new Response(
        JSON.stringify(await authenticate(socketID, channelName)),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  }

  // TODO: Auth
  return new Response(null, { status: 403 });
};
