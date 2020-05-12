import React, { FC } from "react";
import { State, Dispatch } from ".";
import { classNames } from "../../utils/classNames";

export const Cell: FC<{
  path: string[];
  state: State;
  dispatch: React.Dispatch<Dispatch>;
  value: any;
}> = ({ path, state: { data }, dispatch, value }) => {
  let hint;
  let disabled = false;
  const type = typeof value;
  if (["string", "number", "bigint"].includes(type)) return value;
  if (type === "symbol") return value.description;
  if (type === "boolean") return value.toString();
  if (type === "undefined") return null;
  if (type === "function")
    throw new Error("Tried to render a function in a MagicTable Cell");

  if (Array.isArray(value)) {
    disabled = value.length === 0;
    hint = `[${value.length}]`;
  } else {
    hint = (
      <code className="text-sm">{JSON.stringify(value).slice(0, 15)}...</code>
    );
  }

  return (
    <div>
      <a
        href="#"
        className={classNames(
          "text-indigo-600",
          disabled
            ? "cursor-not-allowed line-through"
            : "hover:text-indigo-900 transition duration-150 ease-in-out"
        )}
        onClick={() => {
          if (!disabled)
            dispatch({
              type: "IN",
              path,
            });
        }}
      >
        Open
      </a>
      {hint && <span> {hint}</span>}
    </div>
  );
};
