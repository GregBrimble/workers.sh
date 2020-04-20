import { useMemo } from "react";

export const useWindowKey = ({
  key: targetKey,
  type = "keydown",
  callback,
}: {
  key: string;
  type?: "keydown" | "keypress" | "keyup"; // TODO: Tidy
  callback: () => void;
}) => {
  const keyHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) callback();
  };

  useMemo(() => {
    window.addEventListener(type, keyHandler);

    return () => window.removeEventListener(type, keyHandler);
  }, [type, keyHandler]);
};
