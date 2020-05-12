import { Context } from "../graphql/context";

abstract class ContextualEntity {
  protected context: Context;

  constructor(context: Context) {
    this.context = context;
  }
}

export { ContextualEntity };
