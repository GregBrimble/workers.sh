import { useState } from "react";

export const getValue = (key: string, defaultValue?: any): any => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

export const useLocalStorage = (
  key: string,
  initialValue?: any
): [any, (value: any) => void] => {
  const [storedValue, setStoredValue] = useState(() =>
    getValue(key, initialValue)
  );

  const setValue = (value: any) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue];
};
