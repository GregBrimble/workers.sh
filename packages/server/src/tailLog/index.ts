export type TailLog = {
  id: string;
  expiration?: Date;
  value: any;
};

const KEY_SEPARATOR = ":";

const generateSearchKey = (accountID: string, scriptID: string): string =>
  [accountID, scriptID].join(KEY_SEPARATOR);

const getTailLogID = async (data: any): Promise<string> =>
  data.event.request.headers["cf-request-id"];

const getTailLogIDFromKey = (key: string) => key.split(KEY_SEPARATOR)[2];

const generateKey = async (request: Request, data: any): Promise<string> => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const accountID = parts[2];
  const scriptID = parts[3];
  const tailLogID = await getTailLogID(data);
  return [accountID, scriptID, tailLogID].join(KEY_SEPARATOR);
};

const saveTailLog = async (request: Request): Promise<void> => {
  const data = await request.json();
  await TAIL_LOGS.put(await generateKey(request, data), JSON.stringify(data), {
    expirationTtl: 60 * 2,
  });
};

export const getLogs = async (
  accountID: string,
  scriptID: string
): Promise<TailLog[]> => {
  // TODO: Limited to 1000
  const { keys } = await TAIL_LOGS.list({
    prefix: generateSearchKey(accountID, scriptID),
  });

  const logPromises = keys.map((key) => ({
    id: getTailLogIDFromKey(key.name),
    expiration: key.expiration && new Date(key.expiration * 1000),
    value: TAIL_LOGS.get(key.name, "json"),
  }));
  return Promise.all(logPromises);
};

export const handleRequest = async (request: Request): Promise<Response> => {
  await saveTailLog(request);
  return new Response("Success", { headers: { "Content-Type": "text/plain" } });
};
