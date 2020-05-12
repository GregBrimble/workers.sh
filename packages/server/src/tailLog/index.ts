import { TailLog, TailLogRepository } from "../models/TailLog";
import { AccountRepository } from "../models/Account";

const generateTailLog = async (
  request: Request,
  data: any
): Promise<TailLog> => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  const accountID = parts[3];
  console.log(accountID);
  const account = await AccountRepository.load(accountID);
  const scriptID = parts[4];
  console.log(scriptID);
  const script = await account.script({ id: scriptID });
  return new TailLog({ script, data });
};

const saveTailLog = async (request: Request): Promise<void> => {
  const data = await request.json();
  const tailLog = await generateTailLog(request, data);
  await TailLogRepository.save(tailLog);
};

export const handleRequest = async (request: Request): Promise<Response> => {
  await saveTailLog(request);
  return new Response("Success", { headers: { "Content-Type": "text/plain" } });
};
