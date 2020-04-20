# `server`

## Getting Started

1.  Update `/src/types.d.ts`:

    1.  Add KV Namespaces. For example:

        ```typescript
        declare global {
          const NAMESPACENAME: KVNamespace;
        }
        ```
