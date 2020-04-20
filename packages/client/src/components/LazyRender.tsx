import React, { ReactNode, FC, ReactElement } from "react";

export const LazyRender: FC<{
  loading: boolean;
  error: any;
  name?: string;
  data: any;
  render: (data: any) => any;
}> = ({ loading, error, name, data, render }) => {
  if (loading) return <span>Loading...</span>;
  if (error) {
    if (!name) return <span>Error</span>;

    return <span>Error loading {name}</span>;
  }

  // const rendered = render(data);
  // if (typeof rendered === "string") return <span>{rendered}</span>;

  // return rendered;

  return <span>{render(data)}</span>;
};
