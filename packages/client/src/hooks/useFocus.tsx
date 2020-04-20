import { useRef, MutableRefObject } from "react";

export const useFocus = (): [MutableRefObject<any>, () => {}] => {
  const ref = useRef<any>(null);
  const setFocus = () => ref.current?.focus();
  return [ref, setFocus];
};
