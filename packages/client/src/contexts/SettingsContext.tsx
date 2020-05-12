import React, { createContext, useState, FC, useContext } from "react";
import { useLocalStorage, getValue } from "../hooks/useLocalStorage";
import { client } from "../client";

const AUTHENTICATION_KEY = "CloudflareAuthentication";

type Authentication = {
  token: string;
  emailAddress: string;
  key: string;
};

const SettingsContext = createContext({
  authentication: {
    token: "",
    emailAddress: "",
    key: "",
  },
  setAuthentication: (authentication: Authentication) => {},
});

export const SettingsProvider = ({ children }: any) => {
  const [authentication, setAuthentication] = useLocalStorage(
    AUTHENTICATION_KEY,
    {}
  );

  return (
    <SettingsContext.Provider
      value={{
        authentication,
        setAuthentication,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const { authentication, setAuthentication } = useContext(SettingsContext);

  return {
    authentication,
    setAuthentication: (authentication: Authentication) => {
      setAuthentication(authentication);
      client.resetStore();
    },
    hasToken: !!authentication.token,
    hasKey: !!authentication.emailAddress && !!authentication.key,
  };
};

export const getSettings = (): Authentication => {
  return JSON.parse(window.localStorage.getItem(AUTHENTICATION_KEY) || "{}");
};
