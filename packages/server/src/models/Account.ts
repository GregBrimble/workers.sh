import {
  Entity,
  IndexableColumn,
  Column,
  getRepository,
  PrimaryColumn,
  ToMany,
  toManyType,
  columnType,
  addTo,
} from "@kv-orm/core";
import { CloudflareDatastore } from "../datastores/CloudflareDatastore";
import { Script, CFScript, ScriptRepository } from "./Script";
import { ContextualEntity } from "./ContextualEntity";
import { Context } from "../graphql/context";
import { ScriptArguments } from "../graphql/schema/account";
import { registerWaitUntil } from "wait-until-all";

export type CFAccount = {
  id: string;
  name: string;
  created_on: string;
  // settings
};

@Entity({ datastore: CloudflareDatastore, key: "Account" })
class Account extends ContextualEntity {
  @PrimaryColumn({ key: "id" })
  public id: columnType<string>;

  @IndexableColumn({ key: "name" })
  public name: columnType<string>;

  @ToMany({
    type: () => Script,
    key: "scripts",
    backRef: "account",
    cascade: true,
  })
  public _scripts: toManyType<Script> = [];

  public createdOn: Date;

  get subdomain(): Promise<string | undefined> {
    return (async () => {
      try {
        const { subdomain } = await this.context.cloudflareREST(
          `accounts/${await this.id}/workers/subdomain`
        );
        return subdomain;
      } catch {}
    })();
  }

  get scripts(): Promise<Script[]> {
    return (async () => {
      const accountID = await this.id;
      const scriptsData = await this.context.cloudflareREST(
        `accounts/${accountID}/workers/scripts`
      );
      const scripts: Script[] = [];
      for (const scriptData of scriptsData) {
        const script = new Script(scriptData, this.context, {
          account: this,
          accountID,
        });
        registerWaitUntil(ScriptRepository.save(script));
        scripts.push(script);
      }
      return scripts;
    })();
  }

  public script = async ({ id }: ScriptArguments) => {
    const scripts = await this.scripts;
    for (const script of scripts) {
      if ((await script.id) === id) return script;
    }
  };

  constructor({ id, name, created_on }: CFAccount, context: Context) {
    super(context);
    this.id = id;
    this.name = name;
    this.createdOn = new Date(created_on);
  }
}

export { Account };
export const AccountRepository = getRepository(Account);
