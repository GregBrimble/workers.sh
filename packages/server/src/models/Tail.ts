import { ContextualEntity } from "./ContextualEntity";
import { Context } from "../graphql/context";
import { Script } from "./Script";
import {
  Entity,
  PrimaryColumn,
  columnType,
  ToOne,
  getRepository,
  Column,
} from "@kv-orm/core";
import { TailDatastore } from "../datastores/TailDatastore";

export type CFTail = {
  id: string;
  url: string;
  expires_at: string;
};

@Entity({ datastore: TailDatastore, key: "Tail" })
class Tail extends ContextualEntity {
  @PrimaryColumn({ key: "id" })
  public id: columnType<string>;

  @Column({ key: "url" })
  public url: columnType<string>;

  public expiresAt: Date;

  @ToOne({
    type: () => Script,
    key: "script",
    backRef: "_tails",
    cascade: true,
  })
  public script: Script;

  constructor(
    { id, url, expires_at }: CFTail,
    context: Context,
    { script }: { script: Script }
  ) {
    super(context);
    this.id = id;
    this.url = url;
    this.expiresAt = new Date(expires_at);
    this.script = script;
  }
}

export { Tail };

export const TailRepository = getRepository(Tail);
