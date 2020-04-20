import React, { createContext, useState, FC, useContext } from "react";
import { useLocalStorage, getValue } from "../hooks/useLocalStorage";
import { client } from "../client";

const TOKEN_KEY = "apiToken";

const SettingsContext = createContext({
  token: "",
  setToken: (token: any) => {},
});

export const SettingsProvider = ({ children }: any) => {
  const [token, setToken] = useLocalStorage(TOKEN_KEY, "");

  return (
    <SettingsContext.Provider
      value={{
        token,
        setToken,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const { token, setToken } = useContext(SettingsContext);

  return {
    token,
    setToken: (token: string) => {
      setToken(token);
      client.resetStore();
    },
  };
};

// TODO: This is gross.
export const getSettings = () => {
  return { token: getValue(TOKEN_KEY) };
};
