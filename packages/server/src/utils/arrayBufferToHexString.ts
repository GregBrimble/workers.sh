export const arrayBufferToHexString = (arrayBuffer: ArrayBuffer) =>
  [...new Uint8Array(arrayBuffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
