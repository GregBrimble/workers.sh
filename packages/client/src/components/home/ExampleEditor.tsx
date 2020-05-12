import React from "react";
import Editor from "@monaco-editor/react";

const DEFAULT_WORKER_CODE = `addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Response('Hello from workers.sh!', { status: 200 })
}`;

export const ExampleEditor = () => (
  <Editor
    height="240px"
    language="javascript"
    theme="light"
    value={DEFAULT_WORKER_CODE}
    options={{
      minimap: { enabled: false },
      overviewRulerBorder: false,
      scrollbar: { vertical: "hidden", alwaysConsumeMouseWheel: false },
      scrollBeyondLastLine: false,
    }}
  />
);
