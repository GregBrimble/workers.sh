import {
  Entity,
  Column,
  getRepository,
  PrimaryColumn,
  ToOne,
  columnType,
  toOneType,
} from "@kv-orm/core";
import { TailDatastore } from "../datastores/TailDatastore";
import { Script } from "./Script";

type Exception = {
  name: string;
  message?: string;
  timestamp: number;
};

type Log = {
  message?: string;
  level: string;
  timestamp: number;
};

@Entity({ datastore: TailDatastore, key: "TailLog" })
class TailLog {
  @PrimaryColumn({ key: "id" })
  public id: columnType<string>;

  @ToOne({
    type: () => Script,
    key: "script",
    backRef: "_tailLogs",
    cascade: true,
  })
  public script: toOneType<Script>;

  @Column({ key: "outcome" })
  public outcome: columnType<string>;

  @Column({ key: "exceptions" })
  public exceptions: columnType<Exception[]>;

  @Column({ key: "logs" })
  public logs: columnType<Log[]>;

  @Column({ key: "timestamp" })
  public timestamp: columnType<number>;

  @Column({ key: "url" })
  public url: columnType<string>;

  @Column({ key: "method" })
  public method: columnType<string>;

  @Column({ key: "headers" })
  public headers: columnType<Record<string, string>>;

  @Column({ key: "cf" })
  public cf: columnType<Record<string, string>>;

  constructor({ script, data }) {
    this.id = data.event.request.headers["cf-request-id"];
    this.outcome = data.outcome;
    this.exceptions = data.exceptions;
    this.logs = data.logs;
    this.timestamp = data.eventTimestamp;
    this.url = data.event.request.url;
    this.method = data.event.request.method;
    this.headers = data.event.request.headers;
    this.cf = data.event.request.cf;
    this.script = script;
  }
}

export { TailLog };
export const TailLogRepository = getRepository(TailLog);
