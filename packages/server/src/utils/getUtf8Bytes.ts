export const getUtf8Bytes = (str: string) =>
  new Uint8Array(
    [...unescape(encodeURIComponent(str))].map((c) => c.charCodeAt(0))
  );
