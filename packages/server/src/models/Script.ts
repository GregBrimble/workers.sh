import {
  Entity,
  IndexableColumn,
  getRepository,
  PrimaryColumn,
  ToOne,
  ToMany,
  toOneType,
  columnType,
  toManyType,
} from "@kv-orm/core";
import { CloudflareDatastore } from "../datastores/CloudflareDatastore";
import { Account } from "./Account";
import { TailLog } from "./TailLog";
import { Context } from "../graphql/context";
import { ContextualEntity } from "./ContextualEntity";
import { Tail, TailRepository } from "./Tail";
import { registerWaitUntil } from "wait-until-all";
import {
  AnalyticsArguments,
  generateQuery,
  Analytics,
} from "../graphql/schema/analytics";
import { GraphQLResolveInfo } from "graphql";

export type CFScript = {
  id: string;
  etag: string;
  modified_on: string;
};

@Entity({ datastore: CloudflareDatastore, key: "Script" })
class Script extends ContextualEntity {
  @PrimaryColumn({ key: "identifier" })
  public identifier: columnType<string>;

  @IndexableColumn({ key: "id" }) // NOTE: A Script's `id` is not unique. It is a user-provided name.
  public id: columnType<string>;

  @ToOne({
    type: () => Account,
    key: "account",
    backRef: "_scripts",
    cascade: true,
  })
  public account: toOneType<Account>;

  @ToMany({
    type: () => TailLog,
    key: "tailLogs",
    backRef: "script",
    cascade: true,
  })
  public _tailLogs: toManyType<TailLog> = [];

  @ToMany({
    type: () => Tail,
    key: "tails",
    backRef: "script",
    cascade: true,
  })
  public _tails: toManyType<Tail> = [];

  get tailLogs(): Promise<TailLog[]> {
    return (async () => {
      const tailLogs = [];
      for await (const tailLog of this._tailLogs) {
        tailLogs.push(tailLog);
      }
      return tailLogs;
    })();
  }

  public etag: string;
  public modifiedOn: Date;

  get script(): Promise<string> {
    return (async () => {
      const response = await this.context.cloudflareREST(
        `accounts/${await (await this.account).id}/workers/scripts/${await this
          .id}`,
        undefined,
        { complete: true }
      );
      return response.text();
    })();
  }

  get tails(): Promise<Tail[]> {
    return (async () => {
      const accountID = await (await this.account).id;
      const scriptID = await this.id;
      const tailsData = await this.context.cloudflareREST(
        `accounts/${accountID}/workers/scripts/${scriptID}/tails`
      );
      const tails: Tail[] = [];
      for (const tailData of tailsData) {
        const tail = new Tail(tailData, this.context, {
          script: this,
        });
        registerWaitUntil(TailRepository.save(tail));
        tails.push(tail);
      }
      return tails;
    })();
  }

  public analytics = async (
    args: AnalyticsArguments,
    context: Context,
    info: GraphQLResolveInfo
  ): Promise<Analytics[]> => {
    const account = await this.account;
    const accountID = await account.id;
    const scriptID = await this.id;
    const analyticsData = await context.cloudflareGraphQL(
      ...generateQuery(args, info, { accountID, scriptID })
    );
    return analyticsData.viewer.accounts[0].workersInvocationsAdaptive;
  };

  constructor(
    { id, etag, modified_on }: CFScript,
    context: Context,
    { account, accountID }: { account: Account; accountID: string }
  ) {
    super(context);
    this.identifier = `${accountID}${id}`;
    this.id = id;
    this.etag = etag;
    this.modifiedOn = new Date(modified_on);
    this.account = account;
  }
}

export { Script };
export const ScriptRepository = getRepository(Script);
