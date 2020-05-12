import React, { FC, useMemo, useRef } from "react";
import { useTable, Column } from "react-table";
import last from "lodash/last";
import get from "lodash/get";
import { Cell } from "./Cell";
import { State, Dispatch } from ".";

export const Table: FC<{
  state: State;
  dispatch: React.Dispatch<Dispatch>;
  header?: (accessor: string) => string;
}> = ({ state, dispatch, header = (accessor) => accessor }) => {
  const { data, isArray } = useMemo(() => {
    const { pathStack, data } = state;
    const path = last(pathStack);
    const currentData = path ? get(data, path) : data;

    if (!Array.isArray(currentData))
      return {
        data: [currentData],
        isArray: false,
      };

    return {
      data: currentData,
      isArray: true,
    };
  }, [state]);

  const columns = useMemo(() => {
    const columns: Column[] = [];
    if (data.length > 0)
      if (state.pathStack.length > 0)
        columns.push({
          Header: (
            <a
              href="#"
              className="text-indigo-500 hover:text-indigo-900"
              onClick={() => {
                dispatch({ type: "OUT" });
              }}
            >
              ← Back
            </a>
          ),
          id: "_backLink",
        });

    if (data.length > 0)
      columns.push(
        ...Object.keys(data[0]).map((key) => ({
          Header: header(key),
          accessor: key,
        }))
      );

    return columns;
  }, [data, state.pathStack, header]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ data, columns });

  return (
    <div className="flex flex-col">
      <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table className="min-w-full" {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="bg-white" {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td
                        className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500"
                        {...cell.getCellProps()}
                      >
                        {cell.render((({ value, column, row }: any) => {
                          const path = isArray
                            ? [row.id, column.id]
                            : [column.id];
                          return (
                            <Cell
                              path={path}
                              state={state}
                              dispatch={dispatch}
                              value={value}
                            />
                          );
                        }) as any)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
