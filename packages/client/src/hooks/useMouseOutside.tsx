import { useMemo, RefObject } from "react";

export const useMouseOutside = ({
  target: targetTarget,
  type = "mousedown",
  callback,
}: {
  target: RefObject<any>; // TODO
  type?:
    | "mousedown"
    | "mouseenter"
    | "mouseleave"
    | "mousemove"
    | "mouseout"
    | "mouseover"
    | "mouseup"; // TODO: Tidy
  callback: () => void;
}) => {
  const mouseHandler = (event: MouseEvent) => {
    if (
      targetTarget.current !== null &&
      !targetTarget.current.contains(event.target)
    )
      callback();
  };

  useMemo(() => {
    window.addEventListener(type, mouseHandler);

    return () => window.removeEventListener(type, mouseHandler);
  }, [type, mouseHandler]);
};
