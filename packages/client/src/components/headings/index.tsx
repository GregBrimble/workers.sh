import React from "react";
import { WorkerHeading } from "./WorkerHeading";
import { AccountHeading } from "./AccountHeading";
import { useRouteMatch } from "react-router-dom";

export const Heading = () => {
  const workerMatch = useRouteMatch(
    "/accounts/:accountID/workers/:workerID"
  ) as Record<string, any>;
  const accountMatch = useRouteMatch("/accounts/:accountID") as Record<
    string,
    any
  >;

  if (workerMatch) {
    return <WorkerHeading {...workerMatch.params} />;
  } else if (accountMatch) {
    return <AccountHeading {...accountMatch.params} />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl leading-9 font-bold text-white">workers.sh</h1>
    </div>
  );
};
