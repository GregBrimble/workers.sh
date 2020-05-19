import Pusher from "pusher-js";
import { getSettings } from "../contexts/SettingsContext";

const APP_KEY = "2e0f85d5db4fe82c3479";
const APP_CLUSTER = "eu";

export const getPusher = () => {
  const { token, emailAddress, key } = getSettings();

  return new Pusher(APP_KEY, {
    wsHost: `ws-${APP_CLUSTER}.workers.sh`,
    auth: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "X-AUTH-EMAIL": emailAddress,
        "X-AUTH-KEY": key,
      },
    },
  });
};
