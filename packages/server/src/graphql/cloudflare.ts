export const makeCloudflareClient = (authorization) => {
  return async (
    path: string,
    init: RequestInit = {},
    { complete }: { complete: boolean } = { complete: false }
  ) => {
    let url = `https://api.cloudflare.com/client/v4/${path}`;

    const headers = new Headers(init.headers || {});
    headers.set("Authorization", authorization);
    init.headers = headers;

    const resp = await fetch(url, init);
    if (complete) return resp;
    const data = await resp.json();
    if ((data.errors || []).length !== 0)
      throw new Error(JSON.stringify(data.errors));
    return data.result;
  };
};
