import { APP_ID, APP_KEY, CLUSTER } from ".";
import { sign } from "./auth";
import { getUtf8Bytes } from "../utils/getUtf8Bytes";
import { arrayBufferToHexString } from "../utils/arrayBufferToHexString";

const REST_URL = `https://api-${CLUSTER}.pusher.com`;

export const client = async (
  path: string,
  init: RequestInit = {},
  { complete }: { complete: boolean } = { complete: false }
) => {
  const prefixedPath = `/apps/${APP_ID}${path}`;
  const url = new URL(`${REST_URL}${prefixedPath}`);

  const { body } = init;
  const body_md5 = arrayBufferToHexString(
    await crypto.subtle.digest("md5", getUtf8Bytes(body.toString()))
  );
  const auth_timestamp = Math.round(new Date().getTime() / 1000).toString();
  const auth_version = "1.0";

  const message = `${init.method.toUpperCase() || "GET"}
${prefixedPath}
auth_key=${APP_KEY}&auth_timestamp=${auth_timestamp}&auth_version=${auth_version}&body_md5=${body_md5}`;
  const auth_signature = await sign(message);

  url.searchParams.set("auth_key", APP_KEY);
  url.searchParams.set("auth_timestamp", auth_timestamp);
  url.searchParams.set("auth_version", auth_version);
  url.searchParams.set("body_md5", body_md5);
  url.searchParams.set("auth_signature", auth_signature);

  const resp = await fetch(url.toString(), init);
  if (complete) return resp;
  return await resp.json();
};
