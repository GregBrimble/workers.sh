import React from "react";
import { BigStatus } from "../BigStatus";
import { getPusher } from "../../pusher";
import { useParams } from "react-router-dom";

export const WebSockets = () => {
  const { workerID: scriptID, accountID } = useParams();
  const pusher = getPusher();
  const channel = pusher.subscribe(
    `private-WORKERS.SH_peek-${accountID}-${scriptID}`
  );
  channel.bind("newTailLog", (data: any) => alert(JSON.stringify(data)));
  console.log(channel);
  return (
    <BigStatus
      icon={<path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />}
      text="Coming soon!"
    />
  );
};
