import React, { FC, useState, useReducer, useEffect } from "react";
import get from "lodash/get";
import last from "lodash/last";
import initial from "lodash/initial";
import { Table } from "./Table";

export type State = {
  data: any;
  pathStack: string[][];
};

export type Dispatch =
  | {
      type: "IN";
      path: string[];
    }
  | { type: "OUT" }
  | { type: "SET_DATA"; data: any };

const inState = (state: State, path: string[]): State => {
  const lastPath = last(state.pathStack) || [];
  const newPath = [...state.pathStack, [...lastPath, ...path]];
  return {
    ...state,
    pathStack: newPath,
  };
};

const outState = (state: State): State => {
  return {
    ...state,
    pathStack: initial(state.pathStack),
  };
};

const reducer = (state: State, action: Dispatch) => {
  switch (action.type) {
    case "IN":
      return inState(state, action.path);
    case "OUT":
      return outState(state);
    case "SET_DATA":
      return {
        data: action.data,
        pathStack: [],
      };
  }
};

export const MagicTable: FC<{
  data: any;
  header?: (accessor: string) => string;
}> = ({ data, header = (accessor) => accessor }) => {
  const [state, dispatch] = useReducer(reducer, {
    data,
    pathStack: [],
  });

  useEffect(() => {
    dispatch({ type: "SET_DATA", data });
  }, [data]);

  return <Table state={state} dispatch={dispatch} header={header} />;
};
